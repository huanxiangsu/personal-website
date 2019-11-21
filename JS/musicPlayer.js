var initial_btn_width = 9.89062;
var slider_min = 9.89062;
var slider_max = 366.297;
var bar_min = 0;
var bar_max = 356.391;
var is_moving = false;  // is mouse moving over progress bar
var myPlayer;

$(document).ready(function () {
    // only setup the music player when entered music site
    $('#music-tab-a').on('shown.bs.tab', mainSetupMusicPlayer);
});


function mainSetupMusicPlayer() {
    $('#music-tab-a').off('shown.bs.tab', mainSetupMusicPlayer);

    // setup playlist and enable all functionalities
    // if ajax failed, the music player function cannot click.
    $.ajax({
        "type": "POST",
        "url": './php/readData.php',
        "data": 'data=music',
        'success': function (data) {
            myPlayer = new MusicPlayer(JSON.parse(data));
            enableMusicPlayerFunctions();
        }
    });

    openPlayList();
    autoChangeBackground(); 
}


// the main Music player class
function MusicPlayer(playlist) {
    this.playlist = playlist;
    this.index = 0;
    this.sequence = true;
    this.random = false;
    this.single = false;

    if (playlist !== undefined) {
        $('#songs-Length').text(this.playlist.length);

        // setup playlist
        for (var i = 0; i < this.playlist.length; ++i) {
            var div;
            // div = '<div class="playlist-song-block">';
            //     div += '<div class="row playlist-song">';
            //         div += '<div class="col-sm-1 playlist-song-number">' + (i + 1) + '</div>';
            //         // div += '<div class="col-sm-1 img-circle playlist-song-img"></div>';
            //         div += '<div class="col-sm-11 playlist-song-text">';
            //             div += '<div class="playlist-song-title">' + this.playlist[i].title + '</div>';
            //             div += '<div class="playlist-song-artist">' + this.playlist[i].artist + '</div>';
            //         div += '</div>';
            //     div += '</div>';
            // div += '</div>';

            div = '<div class="playlist-song-block">';
            div += '<div class="playlist-song">';
            div += '<span class="playlist-song-number">' + (i + 1) + '</span>';
            div += '<div class="img-circle playlist-song-img"></div>';
            div += '<span class="playlist-song-text">';
            div += '<div class="playlist-song-title">' + this.playlist[i].title + '</div>';
            div += '<div class="playlist-song-artist">' + this.playlist[i].artist + '</div>';
            div += '</span>';
            div += '</div>';
            div += '</div>';

            $('.playlist-block').append(div);
        }
    } else {
        console.log('music playlist is undefined ...');
    }
    
}

// Music player functions list
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
                src: [song_data.file],
                html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
                volume: 1,
                autoplay: false,
                preload: false,

                onplay: function () {
                    // console.log('playing ' + song_data.title + ' ...');
                    // Display the duration.
                    $('#total-minute').text(formatDuration(Math.round(sound.duration())));
                    
                    // Start upating the progress of the track.
                    requestAnimationFrame(self.step.bind(self));

                    // this.updateProgress = setInterval(self.step.bind(self), 500);
                    
                },

                onplayerror: function () {
                    // console.log('Cannot play ' + song_data.title + ' ...');
                },

                onload: function () {
                    // console.log('loading ' + song_data.title + ' ...');
                },

                onloaderror: function () {
                    // console.log('Cannot load ' + song_data.title + ' ...');
                },

                

                onend: function () {
                    // console.log('ending ' + song_data.title + ' ...');
                    // play next song when ended
                    // clearInterval(this.updateProgress);
                    self.skip('next');
                },

                onpause: function () {
                    // console.log('pausing ' + song_data.title + ' ...');
                },

                onstop: function () {
                    // clearInterval(this.updateProgress);
                    // console.log('stopped ' + song_data.title + ' ...');
                },

                onseek: function () {
                    // console.log('seeking ' + song_data.title + ' ...');
                    // Start upating the progress of the track.
                    // requestAnimationFrame(self.step.bind(self));
                }
            });
        }

        // Begin playing the sound.
        sound.play();

        // Update the track display: title, artist, image
        setActive(index + 1);
        $('.music-name-title').text( (index+1) + '. ' + song_data.title);
        $('.music-name-artist').text(song_data.artist);
        if (song_data.img !== '#') {
            $('.music-img').css('background-image', "url('" + song_data.img + "')");
            showPlaylistImg(index + 1, song_data.img);
        } else {
            $('.music-img').css('background-image', "url('./images/default_music.png')");
            showPlaylistImg(index + 1, './images/default_music.png');
        }
        

        // Show the pause button.
        if (sound.state() === 'loaded') {
            // console.log(song_data.title + ' == loaded');
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

        // hide image and show number in the playlist.
        hidePlaylistImg(self.index + 1);

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
    },

    /**
     * Seek to a new position in the currently playing track.
     * @param  {Number} percent Percentage through the song to skip.
     */
    seek: function (percent) {
        var sound = this.playlist[this.index].howl;
        // Convert the percent into a seek position.
        sound.seek(sound.duration() * percent);
    },

    /**
     * get the time when moving the slider btn in progress bar,
     * and update the current time in the interface.
     * @param {Number} percent Percentage through the song to skip.
     */
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
    }
};


function enableMusicPlayerFunctions() {
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
        refreshMusicImg();
        playMusicBtn();
    });

    $('#prev-btn').on('click', function () {
        pauseMusicBtn();
        myPlayer.skip('prev');
        refreshMusicImg();
        playMusicBtn();
    });

    $('.playlist-song').on('click', function () {
        var index = $(this).find('.playlist-song-number').eq(0).text();
        setActive(index);
        refreshMusicImg();
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
        $('*').on('mouseup', globalMoving);
    });

    // $('#slider-btn').on('mouseup', function (event) {
    //     if (is_moving) {
    //         is_moving = false;
    //         myPlayer.seek(percent_moving);
    //     } 
    // });

    function globalMoving() {
        if (is_moving) {
            is_moving = false;
            myPlayer.seek(percent_moving);
        }
        $('*').off('mouseup', globalMoving);
    }

    $('#myMusic').on('mousemove', function (event) {
        if (is_moving) {
            var bar_width = event.pageX - $('#bar-moving').offset().left;
            
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


function openPlayList() {
    $('#list-btn').on('click', function () {
        $('.playlist-block').slideToggle(350);
    });
}

function setActive(index) {
    $('.playlist-block').children().removeClass('active');
    $('.playlist-block').children().eq(index).addClass('active');
}

function showPlaylistImg(index, img) {
    $('.playlist-block').children().eq(index).children().eq(0).children('.playlist-song-img').css('background-image', "url('" + img + "')");
    $('.playlist-block').children().eq(index).children().eq(0).children('.playlist-song-img').show();
    $('.playlist-block').children().eq(index).children().eq(0).children('.playlist-song-number').hide();
}

function hidePlaylistImg(index) {
    $('.playlist-block').children().eq(index).children().eq(0).children('.playlist-song-img').hide();
    $('.playlist-block').children().eq(index).children().eq(0).children('.playlist-song-number').show();
}


function updateProgressBar(percent) {
    var bar_width = bar_max * percent;
    $('#bar-moving').css('width', bar_width + 'px');
    var slider_width = bar_width + initial_btn_width;
    $('#slider-btn').css('left', slider_width + 'px');
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


function refreshMusicImg() {
    $('.music-img').removeClass('spin-effect');
    window.setTimeout(function () {
        $('.music-img').addClass('spin-effect');
    }, 10);
    
}


var bgIndex = 1;
var autoChangeBg = false;
var autoChangeIn;

function changeBg() {
    if (bgIndex == 0) {
        // gray
        $('.music-player').css('background-color', 'rgba(73, 74, 78, 0.4)');
        $('#bar-moving').css('background-color', 'rgba(241, 235, 237, 0.9)');
        $('.btn-music').css('background-color', 'rgba(73, 74, 78, 0.5)');

    } else if (bgIndex == 1) {
        // blue
        $('.music-player').css('background-color', 'rgba(45, 66, 216, 0.4)');
        $('#bar-moving').css('background-color', 'rgba(4, 33, 243, 0.9)');
        $('.btn-music').css('background-color', 'rgba(45, 66, 216, 0.4)');

    } else if (bgIndex == 2) {
        // red
        $('.music-player').css('background-color', 'rgba(230, 22, 65, 0.4)');
        $('#bar-moving').css('background-color', 'rgba(245, 10, 10, 0.9)');
        $('.btn-music').css('background-color', 'rgba(230, 22, 65, 0.4)');

    } else if (bgIndex == 3) {
        // green
        $('.music-player').css('background-color', 'rgba(63, 150, 146, 0.4)');
        $('#bar-moving').css('background-color', 'rgba(41, 222, 214, 0.9)');
        $('.btn-music').css('background-color', 'rgba(63, 150, 146, 0.4)');
    } else {
        // purple
        $('.music-player').css('background-color', 'rgba(191, 34, 202, 0.4)');
        $('#bar-moving').css('background-color', 'rgba(222, 12, 236, 0.9)');
        $('.btn-music').css('background-color', 'rgba(191, 34, 202, 0.4)');
    }

    ++bgIndex;
    if (bgIndex == 5) {
        bgIndex = 0;
    }
}

function autoChangeBackground() {
    // first time, execute once
    autoChangeIn = setInterval(changeBg, 6000);
    // add auto change every time the page is shown
    $('#music-tab-a').on('shown.bs.tab', function (event) {
        autoChangeIn = setInterval(changeBg, 6000);
    });
    // remove auto change when leave the page
    $('#music-tab-a').on('hidden.bs.tab', function () {
        clearInterval(autoChangeIn);
    });
}
// window.setInterval(changeBg, 6000);

