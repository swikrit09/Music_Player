const play = document.getElementById("play")
        const music = document.querySelector('audio')
        const img = document.querySelector('img')
        const prev = document.getElementById("prev")
        const next = document.getElementById("next")
        const title = document.getElementById("title")
        const artist = document.getElementById("artist")
        const volumeBtn = document.getElementById("volume")
        const downloadBtn = document.getElementById("download")
        var songs;

        console.log(`IsOnline= ${navigator.onLine}`)

        if(navigator.onLine){
            songs = [{
            name: "https://www.pagalworldl.com/files/download/id/21063",
            title: "Heeriye",
            artist: "Jasleen & Arijeet",
            image: "https://naasongslyrics.com/wp-content/uploads/2023/07/Heeriye-feat.-Arijit-Singh-Jasleen-Royal-Dulquer-Salmaan-Song-Download-Naa-Songs-2023.jpg"
        }, {
            name: "https://www.pagalworldl.com/files/download/id/15691",
            title: "Shape Of You X Mann Mera",
            artist: "Ed Shrean",
            image: "https://imgs.search.brave.com/isZ10MKltbEb7MLSBGNvMw-S2CuwrST7CJImhEfDcnk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ1L2Q2/L2I5LzQ1ZDZiOTY0/N2YwMDlhY2IzM2Y1/YzY2NjI1OGU1ZjU3/LS1zb25nLW9uZS10/YWtpbmctYS1icmVh/ay5qcGc"
        }, {
            name: "https://pagaliworld.com/files/download/id/1213",
            title: "Oh Ho Ho HO",
            artist: "Sukhbeer",
            image: "https://3.bp.blogspot.com/-tfTnS4DQlO0/WRMoxebu2nI/AAAAAAABdwM/T7tPgby7pgUdwVU8xa0P0jTUHcpBdNtfgCLcB/s1600/C_dpiQyUwAACb1c.jpg"
        }, {
            name: "https://www.pagalworldl.com/files/download/id/20015",
            title: "Ajab Si",
            artist: "K.K.",
            image: "https://ghantalele.com/uploads/thumbs/cat/856_2.jpg"
        }, {
            name: "https://www.pagalworldl.com/files/download/id/17062",
            title: "Illahi",
            artist: "Arijit Singh",
            image: "https://djmaza.live/siteuploads/thumb/sft18/8872_resize2x_200x200.webp"
        }]
        }
        else{
            songs = [{
            name: "audio2.mp3",
            title: "Heeriye",
            artist: "Jasleen & Arijeet",
            image: "https://naasongslyrics.com/wp-content/uploads/2023/07/Heeriye-feat.-Arijit-Singh-Jasleen-Royal-Dulquer-Salmaan-Song-Download-Naa-Songs-2023.jpg"
        }, {
            name: "audio1.mp3",
            title: "Shape Of You X Mann Mera",
            artist: "Ed Shrean",
            image: "https://imgs.search.brave.com/isZ10MKltbEb7MLSBGNvMw-S2CuwrST7CJImhEfDcnk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ1L2Q2/L2I5LzQ1ZDZiOTY0/N2YwMDlhY2IzM2Y1/YzY2NjI1OGU1ZjU3/LS1zb25nLW9uZS10/YWtpbmctYS1icmVh/ay5qcGc"
        }, {
            name: "audio3.mp3",
            title: "Oh Ho Ho HO",
            artist: "Sukhbeer",
            image: "https://3.bp.blogspot.com/-tfTnS4DQlO0/WRMoxebu2nI/AAAAAAABdwM/T7tPgby7pgUdwVU8xa0P0jTUHcpBdNtfgCLcB/s1600/C_dpiQyUwAACb1c.jpg"
        }]
        }


        let isPlaying = false;
        // for play
        const playMusic = () => {
            isPlaying = true;
            music.play()
            play.classList.replace('fa-play', 'fa-pause')
            img.classList.add("animation")
        }

        // for pause
        const pauseMusic = () => {
            isPlaying = false;
            music.pause()
            play.classList.replace('fa-pause', 'fa-play')
            img.classList.remove("animation")
        }


        play.addEventListener("click", () => {
            // if (isPlaying) {
            //     pauseMusic();
            // }
            // else {
            //     playMusic();
            // }
            isPlaying ? pauseMusic() : playMusic();
        })

        // functionalities with key
        document.addEventListener("keypress", (e) => {
            // play or pause by keys
            console.log(e);
            if (e.code ==='Enter' || e.code === "Space") {
                isPlaying ? pauseMusic() : playMusic();
            }
            // arrow keys for prev and next
            else if (e.code === "KeyA") {
                prevSong();
            }
            else if (e.code === "KeyD") {
                nextSong();
            }
            else if (e.code === "KeyW") {
                if (music.volume < 1) {
                    music.volume += 0.1;
                    volumeBtn.classList.replace("fa-volume-mute","fa-volume-up")
                }
            }
            else if (e.code === "KeyS") {
                if (music.volume > 0) {
                    music.volume -= 0.1;
                }
                if(music.volume==1.3877787807814457e-16){
                    volumeBtn.classList.replace("fa-volume-up","fa-volume-mute")
                }

            
            }
        })


        // changing music data
        const loadSong = (songs) => {
            title.textContent = songs.title;
            artist.textContent = songs.artist;
            // uncomment this for offline

            // for internet
            if(navigator.onLine){
                music.src=songs.name;
            }
            //from offline
            else{
                music.src = "music/" + songs.name;
            }


            img.src = songs.image;
        }
        let songIndex = 0;

        loadSong(songs[songIndex])

        // progres Bar
        // get time update from song
        let progres = document.getElementById("progress");
        let totalDur = document.getElementById("duration")
        let current_time = document.getElementById("currTime")

        music.addEventListener("timeupdate", (event) => {

            // progress bar
            const { currentTime, duration } = event.srcElement;
            // console.log(event);
            let progress_time = (currentTime / duration) * 100;
            progress.style.width = `${progress_time}%`


            // duration
            let min_duration = Math.floor(duration / 60)
            let sec_duration = Math.floor(duration % 60)
            if (sec_duration < 10) {
                sec_duration = `0${sec_duration}`
            }
            let totalduration = `${min_duration}:${sec_duration}
            `
            if (duration) {
                totalDur.textContent = totalduration
            }

            // current time
            let min_currentTime = Math.floor(currentTime / 60)
            let sec_currentTime = Math.floor(currentTime % 60)
            if (sec_currentTime < 10) {
                sec_currentTime = `0${sec_currentTime}`
            }
            let totalcurrentTime = `${min_currentTime}:${sec_currentTime}
            `
            if (currentTime) {
                current_time.textContent = totalcurrentTime
            }

        })

        //  progress update
        const progress_div = document.getElementById("progress_div")
        progress_div.addEventListener('click', (event) => {
            event.preventDefault();
            const clickpoint = event.offsetX;
            const totalWidth = event.srcElement.clientWidth;
            let moveProgres = clickpoint / totalWidth;
            const { duration } = music
            let clickTime = moveProgres * duration;
            console.log( music.currentTime)
            music.currentTime = clickTime;
            console.log( music.currentTime,clickTime)
        })


        // prev pause btn
        const prevSong = () => {
            songIndex = (songIndex - 1 + songs.length) % songs.length
            loadSong(songs[songIndex])
            playMusic()
        }

        const nextSong = () => {
            songIndex = (songIndex + 1) % songs.length
            loadSong(songs[songIndex])
            playMusic()

        }
        const downloadSong = () => {
            console.log(music.src);
            const audioSoruce = music.src;
            const audioName = songs[songIndex].name;

            const downloadLink = document.createElement("a");
            downloadLink.href = audioSoruce;
            downloadLink.download = audioName;

            downloadLink.click()

        }
        isVolClicked = false;
        const volumeSetter = () => {
            if (!isVolClicked ) {
                music.volume = 0
                isVolClicked = true
                music.muted=true
                volumeBtn.classList.replace("fa-volume-up","fa-volume-mute")
            }
            else {
                isVolClicked = false;
                music.volume = 1
                music.muted=false
                volumeBtn.classList.replace("fa-volume-mute","fa-volume-up")
            }
        }

        next.addEventListener('click', nextSong)
        prev.addEventListener('click', prevSong)
        downloadBtn.addEventListener("click", downloadSong)
        volumeBtn.addEventListener("click", volumeSetter)


        // autoplay
        music.addEventListener("ended", nextSong);

        // toggle theme
        const themeBtn = document.getElementById("theme")
        const themeText = document.getElementById("theme-label");

        const lightTheme = () => {
            // change inner text of the label
            themeText.innerText = "Dark Theme"
            // Reset to original theme values
            document.documentElement.style.setProperty('--bgcolor', '#22A699');
            document.documentElement.style.setProperty('--white', '#F2BE22');
            document.documentElement.style.setProperty('--title', '#171717');
            document.documentElement.style.setProperty('--artist', '#445069');
            document.documentElement.style.setProperty('--box-shadow1', 'rgba(0, 0, 0, 0.3)');
            document.documentElement.style.setProperty('--box-shadow-dark', 'rgba(0, 0, 0, 0.4)');
            document.documentElement.style.setProperty('--black', '#000');
            document.documentElement.style.setProperty('--toggle', '#22A699');
        }
        const darkTheme = () => {
            // change inner text of the label
            themeText.innerText = "Light Theme"
            // change root colors
            document.documentElement.style.setProperty('--bgcolor', '#040D12');
            document.documentElement.style.setProperty('--white', '#183D3D');
            document.documentElement.style.setProperty('--title', '#FFF6E0');
            document.documentElement.style.setProperty('--artist', '#D8D9DA');
            document.documentElement.style.setProperty('--box-shadow1', 'rgba(0, 0, 0, 0.2)');
            document.documentElement.style.setProperty('--box-shadow-dark', 'rgba(0, 0, 0, 0.3)');
            document.documentElement.style.setProperty('--black', 'white');
            document.documentElement.style.setProperty('--toggle', '#999');

        }

        themeBtn.addEventListener("change", () => {
            if (themeBtn.checked) {
                darkTheme();
            } else {
                lightTheme();
            }
        });

        // disco theme
        const dthemeBtn = document.getElementById("dtheme")
        const dthemeText = document.getElementById("dtheme-label");

        // dthemeBtn.addEventListener("change", () => {
        //     if (dthemeBtn.checked) {
        //         darkTheme();
        //     } else {
        //         applyLightTheme();
        //     }
        // })

        function applyDarkTheme() {
            // dthemeText.innerText = "Dark Theme";
            // Apply your dark theme changes here
            darkTheme();
            // Toggle back to light theme after a delay
            lightTimer = setTimeout(applyLightTheme, 200);
        }

        function applyLightTheme() {
            // dthemeText.innerText = "Toggle Dark Theme";
            // Apply your light theme changes here
            lightTheme();
            // Toggle back to dark theme after a delay
            DarkTimer = setTimeout(applyDarkTheme, 200);
        }

        dthemeBtn.addEventListener("change", () => {
            if (dthemeBtn.checked) {
                // Start the theme toggling
                applyDarkTheme();
            } else {
                // Clear the theme toggling
                clearTimeout(); // Clear any pending timeouts
                // Apply your original light theme changes here
                clearTimeout(DarkTimer);
                clearTimeout(lightTimer);
            }
        });