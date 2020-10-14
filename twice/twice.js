const header = document.getElementById("header"),
    body = document.body,
    isHome = document.getElementById("home") !== null,
    isProfile = document.getElementById("sc-spy") !== null,
    isDiscography = document.getElementById("album-wrapper") !== null,
    colorbtn = document.getElementById("color-btn"),
    isLyric = colorbtn !== null,
    homevid = isHome && document.getElementById("home").dataset.video,
    muteBtn = document.querySelector(".ts"),
    vidpop = document.getElementsByClassName("video-popup")[0],
    vidcl = document.getElementsByClassName("video-popup-closer")[0],
    trackWrap = document.querySelector(".tracklist-wrapper"),
    songtitle = document.getElementsByClassName("song-title")[0],
    member = document.getElementById("member-colors"),
    vidwrap = document.getElementsByClassName("video-wrapper")[0],
    bgmVid = document.getElementById("bgmVid"),
    bgmHandle = document.getElementById("bgmHandle"),
    bgmButtun = document.getElementById("playVideo"),
    ring = document.getElementById("ringWrap"),
    twice = document.getElementById("twiceProfile");

let TICKING = false,
    SCROLLY = window.scrollY,
    twiceY,
    homePlayer,
    activated,
    player,
    bgmID,
    playerLoaded = false;

function getInsta() {
    const wrapper = document.getElementById("instagram");
    fetch("https://www.instagram.com/twicetagram/")
    .then(a => {
        return a.text();
    }).then(a => {
        const media = JSON.parse(a.slice(a.indexOf("edge_owner_to_timeline_media") + 30, a.indexOf("edge_saved_media") - 2));
        document.getElementById("homeMain").style.minHeight = "100vh",
        media.edges.forEach(m => {
            const node = m.node,
                a = document.createElement("a"),
                img = document.createElement("img");
            
            a.target="_blank",
            a.href = `https://www.instagram.com/p/${node.shortcode}/`,
            img.src = node.display_url,
            a.append(img),
            wrapper.append(a)
        })
    })
}

function animateScroll(o) {
    function a() {
        t += 1 / 60;

        const n = t / c,
            l = i(n);

        1 > n
        ? (window.requestAnimationFrame(a), twice.scrollTo(0, r + (o - r) * l))
        : (
            twice.scrollTo(0, o),
            twice.classList.remove("scrolling")
        )
    }
    const r = twice.scrollTop,
        n = 2e3,
        c = Math.max(.1, Math.min(Math.abs(r - o) / n, .8)),
        i = function (o) {
            return -.5 * (Math.cos(Math.PI * o) - 1)
        };
    let t = 0;
    a()
}

function scrollspy() {
    let e;
    Array.from(document.querySelectorAll(".twice")).forEach(f => {
        const b = f.offsetTop,
            c = f.offsetHeight;
        twiceY > b - c / 2 && twiceY < b + c / 2 && (e = f.id)
    }), Array.from(document.getElementById("sc-spy").querySelectorAll("a")).forEach(b => {
        b.dataset.member === e ? b.classList.add("active") : b.classList.remove("active")
    })
}

function shrinkheader() {
    0 === SCROLLY ? header.classList.remove("shrink") : header.classList.add("shrink")
}

function onYouTubePlayerAPIReady() {
    isHome && (
        homePlyaer = new YT.Player("player", {
            height: "100%",
            width: "100%",
            playerVars: {
                rel: 0,
                loop: 1,
                playsinline: 1,
                playlist: homevid,
                controls: 0,
                showinfo: 0
            },
            videoId: homevid,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        }),
        playerLoaded = true
    ),
    isLyric && (
        player = new YT.Player("player", {
            height: "100%",
            width: "100%",
            playerVars: {
                rel: 0,
                loop: 1,
                playsinline: 1,
                controls: 0,
                showinfo: 0
            },
            videoId: "asdf"
        }), player.addEventListener("onStateChange", a => {
            toggleVideo(),
            0 === a.data && (player.seekTo(0), player.playVideo())
        })
    )
}

function onPlayerReady(b) {
    b.target.playVideo(), b.target.mute()
}

function onPlayerStateChange(b) {
    1 === b.data && (document.getElementById("loading").classList.add("done"), document.getElementById("loadingPseudo").classList.add("done"))
}

function loadVideo(b) {
    player.loadVideoById(b)
}

function toggleVideo() {
    bgmButtun.className = `${1===player.getPlayerState()?"icon-pause":"icon-play"}`
}

function toggleplay() {
    1 === player.getPlayerState() ? player.pauseVideo() : player.playVideo()
}

function ytpause() {
    const c = window.scrollY,
        a = document.getElementById("homeMain").offsetTop;
    c >= a ? homePlyaer.isMuted() && homePlyaer.pauseVideo() : (homePlyaer.playVideo(), document.getElementsByClassName("video-popup")[0].classList.contains("reveal") && homePlyaer.pauseVideo())
}

function discography() {
    const list = document.getElementById("album-list"),
        msnry = new Masonry(list, {
            itemSelector: ".cross-fade",
            columnWidth: ".album-column",
            gutter: ".album-gutter",
            percentPosition: !0
        });
    Array.from(document.getElementById("lang").querySelectorAll("a")).forEach(b => {
        b.addEventListener("click", function () {
            document.getElementById("album-wrapper").dataset.lang = b.dataset.lang, msnry.layout()
        })
    });
}

function toggleSlide(a) {
    a.style.maxHeight = 0 === a.offsetHeight || "0px" === a.style.maxHeight ? `${a.dataset.height}px` : 0, void 0 === a.dataset.height && (a.dataset.height = a.offsetHeight)
}

function getindex(c) {
    let d = 0;
    for (d; c = c.previousElementSibling; d++);
    return d
}

function youtubevideo(b) {
    const a = document.createElement("iframe");
    player.pauseVideo(), a.width = 560, a.height = 315, a.src = `https://youtube.com/embed/${b}?rel=0&playsinline=1&autoplay=1`, a.setAttribute("allow", "autoplay; encrypted-media"), a.setAttribute("allowFullscreen", ""), vidpop.classList.add("reveal"), vidwrap.append(a)
}

header !== null && (
    shrinkheader(),
    document.querySelector(".openbtn").addEventListener("click", () => {
        body.classList.add("navrevealed")
    }), document.querySelector(".closebtn").addEventListener("click", () => {
        body.classList.remove("navrevealed")
    }),
    Array.from(header.querySelectorAll("a")).forEach(a => {
        location.href === a.href && a.classList.add("highlight")
    })
),
isHome && (
    document.body.classList.add("home"),
    getInsta(),
    document.querySelector(".icon-youtube-play.fsb").addEventListener("click", () => {
        const c = document.createElement("div"),
            a = document.createElement("iframe");
        document.body.classList.add("overHidden"), vidpop.classList.add("reveal"), c.className = "video-wrapper", a.width = 560, a.height = 315, a.src = `https://youtube.com/embed/${homevid}?rel=0&playsinline=1&autoplay=1`, a.setAttribute("allow", "autoplay; encrypted-media"), a.setAttribute("allowfullscreen", ""), vidpop.insertBefore(c, vidcl), vidpop.getElementsByClassName("video-wrapper")[0].appendChild(a), homePlyaer.pauseVideo()
    }),
    vidcl.addEventListener("click", () => {
        document.body.classList.remove("overHidden"), vidpop.getElementsByClassName("video-wrapper")[0].remove(), vidpop.classList.remove("reveal"), homePlyaer.playVideo()
    }),
    muteBtn.addEventListener("click", () => {
        homePlyaer.isMuted() ? (homePlyaer.unMute(), muteBtn.classList.remove("icon-volume-mute2"), muteBtn.classList.add("icon-volume-high")) : (homePlyaer.mute(), muteBtn.classList.remove("icon-volume-high"), muteBtn.classList.add("icon-volume-mute2"))
    }),
    window.addEventListener("load", () => {
        setTimeout(() => {
            document.getElementById("loading").classList.add("done"), document.getElementById("loadingPseudo").classList.add("done")
        }, 1e3)
    }, {once: true})
),

isDiscography && (
    discography()
),

isProfile && (
    header.classList.add("shrink"),
    twiceY = twice.scrollTop,
    scrollspy(),
    Array.from(document.querySelectorAll(".smt-scr")).forEach(b => {
        b.addEventListener("click", () => {
            twice.classList.add("scrolling"),
            animateScroll(document.getElementById(`${b.dataset.member}`).offsetTop)
        })
    }),
    window.addEventListener("resize", scrollspy),
    twice.addEventListener("scroll", () => {
        TICKING || (
            window.requestAnimationFrame(() => {
                twiceY = twice.scrollTop,
                scrollspy(),
                TICKING = false
            }),
            TICKING = true
        )
    })
),

isLyric && (
    document.getElementsByClassName("tracklist")[0].style.maxHeight = `${document.getElementsByClassName("tracklist")[0].scrollHeight}px`,
    Array.from(document.querySelectorAll(".song-list")).forEach(c => {
        const b = document.createElement("a");
        c.addEventListener("click", () => {
            !0 === activated || (activated = !0, trackWrap.classList.add("lyric-activated"), member.classList.add("reveal"), colorbtn.classList.add("reveal"), toggleSlide(c.parentNode), songtitle.innerHTML = c.innerHTML, document.getElementsByClassName("lyric")[+getindex(c) - 1].classList.add("reveal"), document.querySelector(".lyrics").classList.add("reveal"), void 0 !== c.dataset.video && (b.className = "icon-youtube-play", b.setAttribute("onclick", `youtubevideo('${c.dataset.video}')`), document.getElementsByClassName("song-info")[0].append(b)), void 0 !== c.dataset.music && (bgmVid.classList.add("reveal"), bgmHandle.classList.add("reveal"), loadVideo(c.dataset.music)))
        })
    }),
    document.querySelector(".back-to-tracklist").addEventListener("click", () => {
        !0 === activated && (
            activated = !1,
            trackWrap.classList.remove("lyric-activated"),
            member.classList.remove("reveal"),
            colorbtn.classList.remove("reveal"),
            toggleSlide(document.querySelector(".tracklist")),
            document.querySelector(".lyric.reveal").classList.remove("reveal"),
            document.querySelector(".lyrics").classList.remove("reveal"),
            bgmVid.classList.remove("reveal"),
            bgmHandle.classList.remove("reveal"),
            player.stopVideo(),
            songtitle.innerHTML = "",
            Array.from(document.querySelectorAll(".icon-youtube-play")).forEach(a => {
                a.remove()
            })
        )
    }),
    colorbtn.addEventListener("click", () => {
        document.body.classList.toggle("color")
    }),
    document.querySelector(".album-closer").addEventListener("click", function(b) {
        b.preventDefault(),
        "https://marshall-ku.com/twice/discography" === document.referrer
        ? history.back()
        : location.href = this.href
    }),
    document.getElementsByClassName("video-popup-closer")[0].addEventListener("click", () => {
        vidwrap.innerHTML = "", vidpop.classList.remove("reveal"), player.playVideo()
    }),
    document.getElementById("playVideo").addEventListener("click", toggleplay), document.getElementById("rewind10").addEventListener("click", () => {
        player.seekTo(Math.floor(player.getCurrentTime()) - 10)
    }),
    document.getElementById("forward10").addEventListener("click", () => {
        player.seekTo(Math.floor(player.getCurrentTime()) + 10)
    })
),

window.addEventListener("scroll", () => {
    TICKING || (
        window.requestAnimationFrame(() => {
            SCROLLY = window.scrollY,
            header !== null && shrinkheader(),
            isHome && (
                SCROLLY !== 0
                ? ring.classList.add("hidden")
                : ring.classList.remove("hidden")
            ),
            TICKING = false
        }),
        TICKING = true
    )
}),
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded")
});
