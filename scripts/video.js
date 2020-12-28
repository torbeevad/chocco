let player;

const playerContainer = $(".player");

function eventsInit() {
    $(".player__start-paused-btn").click(e => {
        e.preventDefault();

        if (playerContainer.hasClass("player--paused")) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);

        $(".player__playback-button").attr("disabled", true);
    });

    $(".player__mute-button").click(e => {
        e.preventDefault();
        const playerVolumeMuteBtn = $(".player__mute-button")

        if (playerVolumeMuteBtn.hasClass("player__mute-button--active")) {
            player.unMute();
            playerVolumeMuteBtn.removeClass("player__mute-button--active");
        } else {
            player.mute();
            playerVolumeMuteBtn.addClass("player__mute-button--active");
        }
    });

    $(".player__volume-level").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newVolumeLevel = (100 / 100) * newButtonPositionPercent;

        $(".player__volume-level-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.setVolume(newVolumeLevel);

        $(".player__volume-level-button").attr("disabled", true);
    })
}

$(".player__splash").click(e => {
    player.playVideo();
})

function formatTime(timeSec) {
    const roundTime = Math.round(timeSec);

    const min = addZero(Math.floor(roundTime / 60));
    const sec = addZero(roundTime - min * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${min} : ${sec}`;
}

function onPlayerReady() {
    let interval;
    const durationSec = player.getDuration();

    $(".player__duration-estimate").text(formatTime(durationSec));

    if (typeof interval !== "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });
        $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
}

function onPlayerStateChange(event) {
    switch (event.data) {
        case 1:
            playerContainer.addClass("active");
            playerContainer.addClass("player--paused");
            break;

        case 2:
            playerContainer.removeClass("active");
            playerContainer.removeClass("player--paused");
            break;
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("yt-player", {
        height: "360",
        width: "640",
        videoId: "yh6NYuc9gC0",
        events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
}



eventsInit();