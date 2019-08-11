var initial_btn_width = 9.89062;
var slider_min = 9.89062;
var slider_max = 366.297;
var bar_min = 0;
var bar_max = 356.391;
var is_moving = false;  // is mouse moving over progress bar

$(document).ready(function () {
    // initial_btn_width = parseFloat($('#slider-btn').css('left'));
    setupMusicPlayer();
});


function setupMusicPlayer() {
    openPlayList();
    musicPlayerFunctions();
}


function openPlayList() {
    $('#list-btn').on('click', function () {
        $('.playlist-block').slideToggle(500);
    });
}


function updateProgressBar(percent) {
    var bar_width = bar_max * percent;
    $('#bar-moving').css('width', bar_width + 'px');
    var slider_width = bar_width + initial_btn_width;
    $('#slider-btn').css('left', slider_width + 'px');
}



function MusicPlayer(playlist) {
    this.playlist = playlist;
    this.index = 0;
    this.sequence = true;
    this.random = false;
    this.single = false;

    $('#songs-Length').text(this.playlist.length);

    for (var i = 0; i < this.playlist.length; ++i) {
        var div;
        div = '<div class="playlist-song-block">';
            div += '<div class="row playlist-song">';
                div += '<div class="col-sm-1 playlist-song-number">' + (i + 1) + '</div>';
                div += '<div class="col-sm-11">';
                    div += '<div class="playlist-song-title">' + this.playlist[i].title + '</div>';
                    div += '<div class="playlist-song-artist">' + this.playlist[i].artist + '</div>';
                div += '</div>';
            div += '</div>';
        div += '</div>';

        $('.playlist-block').append(div);
    }
}


MusicPlayer.prototype = {
    /**
     * Play a song in the playlist.
     * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
     */
    play: function (index) {
        var self = this;
        var sound;

        index = typeof index === 'number' ? index : this.index;
        var song_data = this.playlist[index];

        // If we already loaded this track, use the current one.
        // Otherwise, setup and load a new Howl.
        if (song_data.howl) {
            sound = song_data.howl;
        } else {
            sound = song_data.howl = new Howl({
                src: ['./music/' + song_data.file + '.mp3'],
                html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
                volume: 1,
                autoplay: false,
                preload: false,

                onplay: function () {
                    console.log('playing ' + song_data.title + ' ...');
                    // Display the duration.
                    $('#total-minute').text(formatDuration(Math.round(sound.duration())));
                    
                    // Start upating the progress of the track.
                    requestAnimationFrame(self.step.bind(self));
                    
                },

                onplayerror: function () {
                    console.log('Cannot play ' + song_data.title + ' ...');
                },

                onload: function () {
                    console.log('loading ' + song_data.title + ' ...');
                },

                onloaderror: function () {
                    console.log('Cannot load ' + song_data.title + ' ...');
                },

                

                onend: function () {
                    console.log('ending ' + song_data.title + ' ...');
                    // play next song when ended
                    self.skip('next');
                },

                onpause: function () {
                    console.log('pausing ' + song_data.title + ' ...');
                },

                onstop: function () {
                    console.log('stopped ' + song_data.title + ' ...');
                },

                onseek: function () {
                    console.log('seeking ' + song_data.title + ' ...');
                    // Start upating the progress of the track.
                    // requestAnimationFrame(self.step.bind(self));
                }
            });
        }

        // Begin playing the sound.
        sound.play();

        // Update the track display.
        $('.music-name-title').text( (index+1) + '. ' + song_data.title);
        $('.music-name-artist').text(song_data.artist);

        // Show the pause button.
        if (sound.state() === 'loaded') {
            console.log(song_data.title + ' == loaded');
        } else {
        }

        // Keep track of the index we are currently playing.
        this.index = index;
    },


    /**
     * Pause the currently playing track.
     */
    pause: function () {
        // Get the Howl we want to manipulate.
        var sound = this.playlist[this.index].howl;

        // Puase the sound.
        sound.pause();
    },

    /**
     * Skip to the next or previous track.
     * @param  {String} direction 'next' or 'prev'.
     */
    skip: function (direction) {
        // Get the next track based on the direction of the track.
        var index = -1;
        var self = this;

        if (self.single) {
            // single cycle playing
            index = self.index;

        } else if (self.random) {
            // random playing
            if (self.playlist.length === 1) {
                index = self.index;
            } else {
                // make sure not to pick the same song again.
                do {
                    index = Math.floor(Math.random() * self.playlist.length);
                } while (index === self.index);
            }

        } else {
            // sequence playing
            if (direction === 'prev') {
                index = this.index - 1;
                if (index < 0) {
                    index = this.playlist.length - 1;
                }
            } else {
                index = this.index + 1;
                if (index >= this.playlist.length) {
                    index = 0;
                }
            }
        }

        self.skipTo(index);
    },

    /**
     * Skip to a specific track based on its playlist index.
     * @param  {Number} index Index in the playlist.
     */
    skipTo: function (index) {
        var self = this;
        

        // Stop the current track.
        if (this.playlist[this.index].howl) {
            if (!this.playlist[this.index].howl.playing() ) {
                playMusicBtn();
            }
            this.playlist[this.index].howl.stop();
        } else {
            // first time playing
            playMusicBtn();
        }

        // Reset progress.
        $('#current-minute').text('0:00');
        $('#total-minute').text('0:00');

        // Play the new track.
        self.play(index);
    },

    /**
     * Set the volume and update the volume slider display.
     * @param  {Number} val Volume between 0 and 1.
     */
    volume: function (val) {
        var self = this;

        // Update the global volume (affecting all Howls).
        Howler.volume(val);

        // Update the display on the slider.
        var barWidth = (val * 90) / 100;
        barFull.style.width = (barWidth * 100) + '%';
        sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
    },

    /**
     * Seek to a new position in the currently playing track.
     * @param  {Number} per Percentage through the song to skip.
     */
    seek: function (percent) {
        var sound = this.playlist[this.index].howl;
        // Convert the percent into a seek position.
        sound.seek(sound.duration() * percent);
    },

    getMovingSeek: function (percent) {
        var sound = this.playlist[this.index].howl;
        // Convert the percent into a seek position.
        var seek = sound.duration() * percent;
        $('#current-minute').text(formatDuration(Math.round(seek)));
    },

    /**
     * The step called within requestAnimationFrame to update the playback position.
     */
    step: function () {
        // Get the Howl we want to manipulate.
        var sound = this.playlist[this.index].howl;
        var self = this;

        // Determine our current seek position.
        var seek = sound.seek() || 0;
        var percent = seek / sound.duration();

        // if bar is moving by user, stop update bar automatically
        if (!is_moving) {
            $('#current-minute').text(formatDuration(Math.round(seek)));
            updateProgressBar(percent);
        }

        // If the sound is still playing, continue stepping.
        requestAnimationFrame(self.step.bind(self));
    },

};


// Setup our new audio player class and pass it the playlist.
var myPlayer = new MusicPlayer([
    {
        title: 'Wildest Dreams',
        artist: 'Taylor Swift',
        img: "##",
        file: 'Taylor_Swift_-_Wildest_Dreams',
        howl: null
    },
    {
        title: 'Enchanted',
        artist: "Taylor Swift",
        img: "##",
        file: 'Taylor Swift - Enchanted',
        howl: null
    },
    {
        title: 'Blank Space',
        artist: "Taylor Swift",
        img: "##",
        file: 'Taylor Swift - Blank Space',
        howl: null
    },
    {
        title: 'Wildest Dreams',
        artist: 'Taylor Swift',
        img: "##",
        file: 'Taylor_Swift_-_Wildest_Dreams',
        howl: null
    },
    {
        title: 'Wildest Dreams',
        artist: 'Taylor Swift',
        img: "##",
        file: 'Taylor_Swift_-_Wildest_Dreams',
        howl: null
    },
    {
        title: 'Wildest Dreams',
        artist: 'Taylor Swift',
        img: "##",
        file: 'Taylor_Swift_-_Wildest_Dreams',
        howl: null
    },
    {
        title: 'Wildest Dreams',
        artist: 'Taylor Swift',
        img: "##",
        file: 'Taylor_Swift_-_Wildest_Dreams',
        howl: null
    },
    {
        title: 'Wildest Dreams',
        artist: 'Taylor Swift',
        img: "##",
        file: 'Taylor_Swift_-_Wildest_Dreams',
        howl: null
    },
    {
        title: 'Wildest Dreams',
        artist: 'Taylor Swift',
        img: "##",
        file: 'Taylor_Swift_-_Wildest_Dreams',
        howl: null
    },
    {
        title: 'Wildest Dreams',
        artist: 'Taylor Swift',
        img: "##",
        file: 'Taylor_Swift_-_Wildest_Dreams',
        howl: null
    },
]);


function musicPlayerFunctions() {
    $('#play-btn').on('click', function () {
        myPlayer.play();
        playMusicBtn();
    });

    $("#pause-btn").on('click', function () {
        myPlayer.pause();
        pauseMusicBtn();
    });

    $('#next-btn').on('click', function () {
        pauseMusicBtn();
        myPlayer.skip('next');
        playMusicBtn();
    });

    $('#prev-btn').on('click', function () {
        pauseMusicBtn();
        myPlayer.skip('prev');
        playMusicBtn();
    });

    $('.playlist-song').on('click', function () {
        var index = $(this).find('.playlist-song-number').eq(0).text();
        myPlayer.skipTo(index - 1);
    });

    var percent_moving;
    $('#bar-empty').on('click', function (event) {
        var bar_width = event.pageX - $(this).offset().left;
        var percent = bar_width / bar_max;
        myPlayer.seek(percent);
    });

    $('#slider-btn').on('mousedown', function (event) {
        is_moving = true;
    });

    $('#slider-btn').on('mouseup', function (event) {
        if (is_moving) {
            is_moving = false;
            myPlayer.seek(percent_moving);
            console.log('percent == ' + percent_moving);
        }
        
    });

    $('*').on('mouseup', function () {
        if (is_moving) {
            is_moving = false;
            myPlayer.seek(percent_moving);
            console.log('percent == ' + percent_moving);
        }
    });

    $('.music-player').on('mousemove', function (event) {
        if (is_moving) {
            var bar_width = event.pageX - $('#bar-moving').offset().left;
            
            // var slider_width = initial_btn_width + bar_width;
            if (bar_width >= bar_min && bar_width <= bar_max) {
                percent_moving = bar_width / bar_max;
                var slider_width = bar_width + initial_btn_width;
                $('#bar-moving').css('width', bar_width + 'px');
                $('#slider-btn').css('left', slider_width + 'px');
                myPlayer.getMovingSeek(percent_moving);
            }

        }
    });

    // sequence -> random -> single -> sequence
    $('#sequence-btn').on('click', function () {
        $(this).hide();
        $('#random-btn').show();
        myPlayer.sequence = false;
        myPlayer.random = true;
    });

    $('#random-btn').on('click', function () {
        $(this).hide();
        $('#redo-btn').show();
        myPlayer.random = false;
        myPlayer.single = true;
    });

    $('#redo-btn').on('click', function () {
        $(this).hide();
        $('#sequence-btn').show();
        myPlayer.single = false;
        myPlayer.sequence = true;
    });
}


function formatDuration(duration) {
    // duration in seconds
    var minutes = Math.floor(duration / 60) || 0;
    var seconds = (duration - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function playMusicBtn() {
    $('#play-btn').hide();
    $('#pause-btn').css({
        'display': 'inline-block'
    });
    $('.music-img').css({
        'animation-play-state': 'running'
    });
}

function pauseMusicBtn() {
    $('#pause-btn').hide();
    $('#play-btn').css({
        'display': 'inline-block'
    });
    $('.music-img').css({
        'animation-play-state': 'paused'
    });
}



function increment() {
    // $('#next-btn').on('click', function () {
    //     var full_width = parseFloat( $('#bar-empty').css('width'));
    //     var ten = full_width / 10;
    //     var current_width = parseFloat( $('#bar-moving').css('width'));
    //     current_width += ten;
    //     current_width = current_width / full_width * 0.9 * 100;
    //     current_width = current_width + '%';

    //     var btn_current_width = parseFloat($('#slider-btn').css('left'));
    //     btn_current_width += ten;

    //     $('#bar-moving').css('width', current_width);
    //     $('#slider-btn').css('left', btn_current_width + 'px');
    // });
}

/*
function progress_movement() {
    $('#bar-empty').on('click', function (event) {
        var bar_width = event.pageX - $(this).offset().left;
        var full_width = parseFloat($('#bar-empty').css('width'));
        // bar_width = bar_width / full_width * 0.9 * 100;
        $('#bar-moving').css('width', bar_width + 'px');
        var slider_width = bar_width + initial_btn_width;
        $('#slider-btn').css('left', slider_width + 'px');

        // console.log(bar_width);
        // console.log(full_width);
        // console.log(slider_width);

    });

    $('#slider-btn').on('mousedown', function (event) {
        is_moving = true;
    });

    $('#slider-btn').on('mouseup', function (event) {
        is_moving = false;
    });
    $('*').on('mouseup', function () {
        is_moving = false;
    });

    $('.music-player').on('mousemove', function (event) {
        if (is_moving) {
            // console.log(event.clientX);
            // console.log(event.pageX);
            // console.log(window.innerWidth);
            // console.log('--------------------');

            var bar_width = event.pageX - $('#bar-moving').offset().left;
            var slider_width = initial_btn_width + bar_width;
            if (bar_width >= bar_min && bar_width <= bar_max) {
                $('#bar-moving').css('width', bar_width + 'px');
                $('#slider-btn').css('left', slider_width + 'px');
            }

        }
    });
}
*/
