// "use strict"
try {
    var peer = new Peer({ host: 'nhiandvy.ddns.net', port: 9000, path: '/myapp' });
    peer.on('open', id => { console.log(id) })
} catch (er) {
    console.log(er)
}

var ticketStats = new Vue({
    el: '#container',
    data: {
        cameraArray: [{ name: 'cam1' }, { name: 'cam2' }, { name: 'cam3' }],
        stic: false
    },
    methods: {
        verifyUser() {
            return true
        },
        login() {
            if (this.verifyUser()) {
                window.location.href = 'mainPage.html?id=' + this.userId
            } else {
                this.invalidUser = true
            }

        },
        setUpOPtionButton() {
            var header = document.getElementById("selector");
            var sticky = header.offsetTop;
            let top = $('#top').height();
            if (this.stic == false) {
                this.stic = true;
                header.classList.add("sticky");
                $('#selector').css('display', 'block');
                $('#selector').css('z-index', '1')
                $('#selector').css('margin-top', top + 15);
            } else {
                this.stic = false;
                $('#selector').css('display', 'none');
                header.classList.remove("sticky");
                $('#selector').css('margin-top', 0);
            }
        },
    }
    ,
    mounted: function () {
    }
})

jQuery(document).ready(function ($) {
    let top = $('#top').height();
    $('#infoSection').css('margin-top', top + 15);
});