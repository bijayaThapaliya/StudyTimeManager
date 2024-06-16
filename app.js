let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: 'PC-9VlFRETQ', // Replace with a valid video ID
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
}

document.getElementById('timerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studyDuration = parseInt(document.getElementById('studyDuration').value) * 60000; // Convert to milliseconds
    const breakDuration = parseInt(document.getElementById('breakDuration').value) * 60000;

    startStudyBreakCycle(studyDuration, breakDuration);
});

function startStudyBreakCycle(studyDuration, breakDuration) {
    document.getElementById('status').innerText = "Study Time!";
    player.playVideo();

    setTimeout(() => {
        playBeep();
        player.pauseVideo();
        document.getElementById('status').innerText = "Break Time!";
        
        setTimeout(() => {
            playBeep();
            startStudyBreakCycle(studyDuration, breakDuration);
        }, breakDuration);
    }, studyDuration);
}

function playBeep() {
    let beep = new Audio('./Assets/beep.mp3'); // Add a beep sound file in your project directory
    beep.play();
}
