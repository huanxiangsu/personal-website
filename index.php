<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Xiang's Home</title>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/weather/0.0.2/weather.min.js"></script>

    <!-- font awesome: for icons -->
    <link rel="stylesheet" type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
    
    <link rel="stylesheet" type="text/css" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <!-- moment: for time -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>

    <!-- howler: for music-->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.2/howler.min.js"></script>
    
    <!-- Semantic UI -->
    <!-- <link rel="stylesheet" type="text/css" href="lib/semantic_ui/semantic.min.copy.css">
    <script src="lib/semantic_ui/semantic.min.copy.js"></script> -->
    <link rel="stylesheet" type="text/css" href="lib/semantic_ui/sidebar.min.css">
    <link rel="stylesheet" type="text/css" href="lib/semantic_ui/menu.min.css">
    <link rel="stylesheet" type="text/css" href="lib/semantic_ui/image.min.css">
    <link rel="stylesheet" type="text/css" href="lib/semantic_ui/item.min.css">
    <link rel="stylesheet" type="text/css" href="lib/semantic_ui/icon.min.css">
    <link rel="stylesheet" type="text/css" href="lib/semantic_ui/header.min.css">
    <script src="lib/semantic_ui/sidebar.min.js"></script>

    <!-- my source code -->
    <link rel="stylesheet" type="text/css" href = "CSS/homePage.css">
    <link rel="stylesheet" type="text/css" href="CSS/my_ui.css">
    <script type="text/javascript" src="JS/homePage.js"></script>
</head>

<body id="main">

<!-- ui sidebar -->
<div class="ui sidebar vertical inverted menu left overlay">
    <div class="item">
        <a class="ui logo icon image" href="./">
            <img src="./images/x10.png">
        </a>
        <a class="ui-sidebar-header-name" href="./">
            <b >xiang</b>
        </a>
    </div>
    <a class="item" id="sidebar-home-a"><b>Home</b></a>
    <a class="item" id="sidebar-about-a"><b>About Me</b></a>
    <a class="item" id="sidebar-resume-a"><b>Resume</b></a>
    <div class="item">
        <div class="header">Personal</div>
        <div class="menu">
            <a class="item" href="<?php if ($_SERVER['HTTP_HOST'] == "web.cecs.pdx.edu"){echo "http://kara.myftp.org/xiang/blog";} else{echo "../blog/";} ?>" target="_blank">Blog</a>
            <a class="item" id="sidebar-gallery-a">Gallery</a>
            <a class="item" id="sidebar-music-a">Music</a>
            <a class="item" id="sidebar-project-a">Project</a>
        </div>
    </div>
    <a class="item" id="sidebar-contact-a"><b>Contact</b></a>
    <div class="item">
        <div class="menu ui-icon-menu">
            <a class="social-media-link" href="https://twitter.com/" target="_blank">
                <i class='fab fa-twitter social-media-icon'></i>
            </a>
            <a class="social-media-link" href="https://www.facebook.com/" target="_blank">
                <i class='fab fa-facebook-f social-media-icon'></i>
            </a>
            <a class="social-media-link" href="https://web.wechat.com/" target="_blank">
                <i class='fa fa-wechat social-media-icon'></i>
            </a>
            <a class="social-media-link" href="https://www.weibo.com/" target="_blank">
                <i class='fab fa-weibo social-media-icon'></i>
            </a>
            <a class="social-media-link" href="https://im.qq.com/" target="_blank">
                <i class='fa fa-qq social-media-icon'></i>
            </a>
            <a class="social-media-link" href="https://github.com/huanxiangsu" target="_blank">
                <i class='fab fa-github social-media-icon'></i>
            </a>
        </div>
    </div>
    
</div>
    

<div class="pusher">
    <nav class="navbar navbar-default navbar-fixed-top" id="my-nav">
        <div class="container-fluid">
            <div class="navbar-header">
                <!-- <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button> -->
                <button type="button" class="navbar-toggle" id="ui-meau">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand brand-img-block" href="./">
                    <img class="brand-img" src="images/x10.png">
                </a>
                <a class="navbar-brand brand-text" href="./">
                    xiang
                </a>
            </div>

            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav navbar-right" id="myNav">
                    <li class="active"><a id="home-tab-a" class="tab-link" data-toggle="pill" href="#home">Home</a></li>
                    <li id="about-tab"><a id="about-tab-a" class="tab-link" data-toggle="pill" href="#AboutMe">About</a></li>
                    <li><a id="resume-tab-a" class="tab-link" data-toggle="pill" href="#Resume">Resume</a></li>
                    <li class="dropdown">
                        <a class="dropdown-toggle tab-link" id="dropdown" href="#">Personal
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="tab-link" href="<?php if ($_SERVER['HTTP_HOST'] == "web.cecs.pdx.edu"){echo "http://kara.myftp.org/xiang/blog";} else{echo "../blog/";} ?>" target="_blank">Blog</a></li>
                            <li><a class="tab-link" id="gallery-tab-a" data-toggle="pill" href="#myGallary">Gallery</a></li>
                            <li><a class="tab-link" id="music-tab-a" data-toggle="pill" href="#myMusic">Music</a></li>
                            <li id="project-tab"><a id="project-tab-a" class="tab-link" data-toggle="pill" href="#myProject">Projects</a></li>
                        </ul>
                    </li>

                    <li><a class="tab-link" id="to-contact" href="#contact">Contact</a></li>
            
                    <li>
                        <ul class="nav navbar-nav social-media-list">
                            <li>
                                <a class="social-media-link zoom-effect" href="https://twitter.com/" target="_blank">
                                    <i class='fab fa-twitter social-media-icon'></i>
                                </a>
                            </li>
                            <li>
                                <a class="social-media-link zoom-effect" href="https://www.facebook.com/" target="_blank">
                                    <i class='fab fa-facebook-f social-media-icon'></i>
                                </a>
                            </li>
                            <li>
                                <a class="social-media-link zoom-effect" href="https://web.wechat.com/" target="_blank">
                                    <i class='fa fa-wechat social-media-icon'></i>
                                </a>
                            </li>
                            <li>
                                <a class="social-media-link zoom-effect" href="https://www.weibo.com/" target="_blank">
                                    <i class='fab fa-weibo social-media-icon'></i>
                                </a>
                            </li>
                            <li>
                                <a class="social-media-link zoom-effect" href="https://im.qq.com/" target="_blank">
                                    <i class='fa fa-qq social-media-icon'></i>
                                </a>
                            </li>
                            <li>
                                <a class="social-media-link zoom-effect" href="https://github.com/huanxiangsu" target="_blank">
                                    <i class='fab fa-github social-media-icon'></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

<!--------------------------------------------- image slide site -------------------------------------->
    <div class="container-fluid bg1">
        <div class="row" style="margin-top:55px;">
            <div class="col-sm-3"></div>

            <div class="col-sm-6">
                <!-- Image slide show -->
                <div class="imgSlide">
                    <div id="myCarousel" class="carousel slide" data-ride="carousel">
                        <!-- img -->
                        <div class="carousel-inner">
                            <div class="item active">
                                <img class="myimg img-responsive img-rounded zoom-effect" src="images/stars.png" alt="image-1">
                            </div>
                            <div class="item">
                                <img class="myimg img-responsive img-rounded zoom-effect" src="images/p7.jpg" alt="image-2">
                            </div>
                            <div class="item">
                                <img class="myimg img-responsive img-rounded zoom-effect" src="images/p8.jpg" alt="image-4">
                            </div>
                        </div>
                
                        <!-- left and right controller -->
                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-sm-3"></div>
        </div>
        
    </div>
    <!-- end slide show -->

<!---------------------------------------- content list ---------------------------------------->

    <div class = "container-fluid bg2 music-bg">
        <div class="row" id="content-top" style="height:30px"></div>

        <div class="row content">
            <div class="col-sm-1"></div>
            <div class="col-sm-8 side">
                <!-- tab content list -->
                <div class="tab-content">

<!---------------------------------------- Home content ---------------------------------------->

                    <div id="home" class="tab-pane fade in active">
                        <div class="row home-row">
                            <div class="col-sm-6">
                                <img class="home-img myimg img-responsive img-rounded opacity-effect" src="images/p9.jpg" alt="Sunset Sky">
                            </div>
                            <div class="col-sm-6 intro-text">
                                <h2 class="home-sentence">Happiness is a way station between too much and too little.</h2>
                            </div>
                        </div>

                        <div class="row home-row">
                            <hr>
                            <div class="col-sm-6 intro-text">
                                <h2 class="home-sentence">When the whole world is about to rain, let's make it clear in our heart together.</h2>
                            </div>
                            <div class="col-sm-6">
                                <img class="home-img myimg img-responsive img-rounded opacity-effect" src="images/c7.jpg" alt="Sky with sun">
                            </div>
                        </div>
                        
                        <div class="row home-row">
                            <hr>
                            <div class="col-sm-6">
                                <img class="home-img myimg img-responsive img-rounded opacity-effect" src="images/c4.jpg" alt="Lantern with Glim">
                            </div>
                            <div class="col-sm-6 intro-text">
                                <h2 class="home-sentence">All the times run into the past, yet the past is not full.</h2>
                            </div>
                        </div>
                        
                        <div class="row home-row">
                            <hr>
                            <div class="col-sm-6 intro-text">
                                <h2 class="home-sentence">If you are doing your best, you will not have to worry about failure.</h2>   
                            </div>
                            <div class="col-sm-6">
                                <img class="home-img myimg img-responsive img-rounded opacity-effect" src="images/c1.jpg" alt="Adventure Hill">
                            </div>
                        
                        </div>

                        <div class="row" style="height:100px"></div>

                    </div>
                    <!-- End Home tab -->

    <!--------------------------------------------- introduction site -------------------------------------->

                    <!-- section 1 content -->
                    <div id="AboutMe" class="tab-pane fade">
                        <div>
                            <img class="myimg img-responsive zoom-effect title-img" src="images/my_introduction.png">
                        </div>
                        <div id="intro-block" class="personal-block">
                            <img class="myimg img-responsive img-rounded zoom-effect intro-img" src="images/x11.jpg">
                            <p class="intro-text" style="font-size:24px; margin: 10px 0px 0px">Hello I'm</p>
                            <h2 class="intro-text" style="font-size:36px; font-weight: 900; margin-top: 0px; color: rgba(0,0,0,0.8);">Huanxiang Su</h2>
                            <p class="intro-text">I am an undergraduate student at <em>Portland State
                                        University</em> and currently pursuing Bachelor degree of Computer Science. My background on computer
                                    science started when I first attend university after high school graduation. Since I am pretty interesting in
                                    computer so I chose computer science as my major. So far I am pretty enjoying learning CS and hoping I can
                                    learn more knowledge in this area, especially in programming languages and full-stack web development.
                                    Therefore, software engineer is my currently pursuing goal on my career.</p>
                            <p></p><br>
                            <p class="intro-text">In my leisure time, I like playing playing video games, listening to music, and watching
                                    TV and reality show. So in my personal website, I make a very simple music player to play some of my favorite
                                    songs. I also collected lots of beautiful and amazing anime images when I was young and I pretty like watching
                                    anime at that time, and thus I make a simple gallery page to exhibit my favorite images.</p>
                            <p></p><br>
                            <p class="intro-text">Right now, my personal interest is to learn how to develop game in both web application
                                    and mobile application, and I would like to learn more about Photoshop to enhance my skill in editing photos as
                                    well as making stuff for my application.</p>
                        </div>
                    </div>

    <!--------------------------------------------- resume site -------------------------------------->
                
                    <div id="Resume" class="tab-pane fade">
                        <div>
                            <img class="myimg img-responsive zoom-effect title-img" src="images/my_resume.png">
                        </div>
                        <div id="resume-block" class="personal-block"></div>
                    </div>

    <!--------------------------------------------- music site -------------------------------------->

                    <div id="myMusic" class="tab-pane fade">
                        <div>
                            <img class="myimg img-responsive zoom-effect title-img" src="images/my_musics.png">
                        </div>
                        
                        <div class="music-player">
                            <div class="music-name">
                                <div class="music-name-title">
                                    Title
                                </div>
                                <div class="music-name-artist">
                                    Artist
                                </div>
                            </div>
                                
                            <div class="img-circle music-img spin-effect">
                                <div class="music-center-circle">
                                </div>
                            </div>

                            <div class="progress-music">
                                <div id="bar-moving" class="bar"></div>
                                <div id="bar-empty" class="bar"></div>
                                <div id="slider-btn"></div>
                            </div>

                            <div class="progress-text">
                                <span id="current-minute">
                                    0:00
                                </span>
                                <span id="total-minute">
                                    0:00
                                </span>
                            </div>
                            <div class="music-control-bars">
                                <div class="control-inner">
                                    <div class="btn btn-music" id="prev-btn"><i class="fas fa-step-backward"></i></div>
                                    <div class="btn btn-music" id="play-btn"><i class="fas fa-play"></i></div>
                                    <div class="btn btn-music" id="pause-btn"><i class="fas fa-pause"></i></div>
                                    <div class="btn btn-music" id="next-btn"><i class="fas fa-step-forward"></i></div>
                                    
                                </div>
                                <div class="btn btn-music" id="list-btn"><i class="fas fa-list-ul"></i></div>
                                <div class="btn btn-music" id="sequence-btn"><i class="fas fa-sync"></i></div>
                                <div class="btn btn-music" id="random-btn"><i class="fas fa-random"></i></div>
                                <div class="btn btn-music" id="redo-btn"><i class="fas fa-redo"></i></div>
                            </div>

                            <div class="playlist-block">
                                <div class="playlist-header">
                                    <div class="playlist-header-text">
                                        <span><i class="fas fa-music" style="font-size: 25px;"></i></span>
                                        &nbsp;&nbsp;My Playlist (<span id="songs-Length">0</span>)
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

    <!--------------------------------------------- calender site -------------------------------------->
                
                    <div id="myCalender" class="tab-pane fade">
                        <div>
                            <img class="myimg img-responsive zoom-effect title-img" src="images/my_calender.png">
                        </div>
                    </div>

    <!--------------------------------------------- photos gallary site -------------------------------------->
                
                    <div id="myGallary" class="tab-pane fade">
                        <div>
                            <img class="myimg img-responsive zoom-effect title-img" src="images/my_gallery.png">
                        </div>
                        <div class="gallary-icon-list">
                            <i class='fas fa-image gallary-icon' id="lg1"></i>
                            <i class='fas fa-th-large gallary-icon' id="lg2"></i>
                            <i class='fas fa-th gallary-icon' id="lg3"></i>    
                        </div>

                        <div class="gallary">
                            <!-- photos gallary -->
                        </div>
                    </div>

    <!--------------------------------------------- personal projects site -------------------------------------->

                    <div id="myProject" class="tab-pane fade">
                        <div>
                            <img class="myimg img-responsive zoom-effect title-img" src="images/my_project.png">
                        </div>
                    </div>

    <!--------------------------------------------- personal notes site -------------------------------------->
                
                    <div id="myNotes" class="tab-pane fade">
                        <div>
                            <img class="myimg img-responsive zoom-effect title-img" src="#">
                        </div>
                        <div>
                            <br><br>
                            <h1>Developing ...</h1>
                        </div>
                    </div>

    <!--------------------------------------------- END -------------------------------------->

                </div>
                <!-- end tab content -->
            </div>

    <!--------------------------------------------- side content site -------------------------------------->

            <!-- <div class="col-sm-1"></div> -->
            <div class="col-sm-3 side-col">
                <div class="side-content">
                    <div class="about-me-block">
                        <div class="about-me-header">
                            <i class="far fa-hand-point-right about-me-header-icon zoom-effect"></i>
                            <a class="about-me-header-title" id="side-about-id" href="#AboutMe">About Me >></a>
                        </div>
                        <div class="about-me-img">
                            <img class="myimg img-responsive img-rounded zoom-effect" src="images/x11.jpg">
                        </div>
                        <div class="about-me-content">
                            Name: Huanxiang Su <br>
                            Major: Computer Science <br>
                            School: Portland State University
                        </div>
                    </div>
                    <hr>

                    <div class="about-me-block">
                        <div class="about-me-header">
                            <i class="far fa-hand-point-right about-me-header-icon zoom-effect"></i>
                            <a class="about-me-header-title" id="side-project-id" href="#myProject" style="font-size:20px">Recent Projects >></a>
                        </div>
                        <div class="about-me-content side-project-content">
                        </div>
                    </div>
                    <hr>
                    
                    <div class="about-me-block">
                        <div class="about-me-header">
                            <i class="far fa-hand-point-right about-me-header-icon zoom-effect"></i>
                            <a class="about-me-header-title" id="side-calender-id" style="font-size:20px" href="#myCalender">Calender >></a>
                        </div>
                        <div class="about-me-content">
                            <iframe id="frame-calender"
                                src="https://calendar.google.com/calendar/embed?height=400&amp;wkst=1&amp;bgcolor=%23039BE5&amp;ctz=America%2FLos_Angeles&amp;src=eGlhbmc2MjU3NjQ1NjNAZ21haWwuY29t&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%237986CB&amp;color=%2333B679&amp;color=%230B8043&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showCalendars=0&amp;showPrint=0&amp;showTz=1&amp;showTabs=0&amp;mode=MONTH"
                                style="border-width:0" width="100%" height="100%" frameborder="0" scrolling="no">
                            </iframe>
                            <p class="text-center" id="moment-time" style="margin-top:4px; font-size: 16px"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="height:20px"></div>
    </div>

<!--------------------------------------------- Bottom contact site -------------------------------------->

    <div id="contact" class="container-fluid">
        <div class="container">
            <h2 class="text-center my-text-title">CONTACT</h2>
            <div class="row">

                <div class="col-sm-5 my-text">
                    <p style="font-size:22px; color: rgba(0, 0, 0,0.63);">Contact Me:</p>
                    <p><span class="fas fa-map-marker-alt contact-icon" style="color:#16a9ce; margin-left: 33px"></span>Portland, OR</p>
                    <p><span class="glyphicon glyphicon-phone contact-icon" style="color:rgb(51, 50, 49,0.65)"></span>+1 (503)-515-1075</p>
                    <p><span class="fas fa-envelope contact-icon" style="color:rgb(240, 120, 84)"></span><a href="mailto:huanxsu@pdx.edu">huanxsu@pdx.edu</a></p>
                    <p><span class="fas fa-envelope contact-icon" style="color:rgb(240, 120, 84)" ></span><a href="mailto:xiang625764563@gmail.com">xiang625764563@gmail.com</a></p>
                    <p><span class="fa fa-wechat contact-icon" style="color:#2dc102"></span>xx131456286</p>     
                </div>

                <div class="col-sm-7">
                    <div class="row">
                        <div class="col-sm-6 form-group">
                            <input class="form-control" placeholder="Name" type="text" id="comment-name" required>
                        </div>
                        <div class="col-sm-6 form-group">
                            <input class="form-control" placeholder="Email" type="email" id="comment-email" required>
                        </div>
                    </div>
                    <textarea class="form-control" placeholder="Optional: Your Comment" id="comment-area" rows="6"></textarea><br>
                    <div class="row">
                        <div class="col-sm-12 form-group" style="text-align:right">
                            <p id="comment-response"></p>
                            <button id="comment-send" class="btn btn-primary transparent-primary-btn" type="submit">Send</button>
                            
                        </div>
                    </div>
                </div>

            </div>
            <hr>
            <div class="my-text text-center">
                <p class="text-center">Copyright © 2019 Huanxiang Su - All Rights Reserved</p>
                <p class="text-center">Last Modified: 12/14/2019</p>
            </div>
            
        </div>
    </div>

<!-- go to top botton -->
    <div class="scroll-top-block" id="scroll-top">
        <button class="btn scroll-top-btn" title="Top">
            <i class="fas fa-arrow-up"></i>
        </button>
    </div>

</div> <!-- end pusher -->

<!--------------------------------------------- gallary modal site -------------------------------------->

<div id="gallary-img-modal" class="modal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-close">
            <button type="button" class="close modal-close-btn zoom-effect">&times;</button>
        </div>
        <img class="img-responsive img-rounded modal-img" id="modal-img" src="#">
        <div id="modal-img-caption"></div>
    </div>
</div>

<!-- js sources -->
<script type="text/javascript" src="JS/my_ui.js"></script>
<script type="text/javascript" src="JS/gallary.js"></script>
<script type="text/javascript" src="JS/musicPlayer.js"></script>

</body>
</html>