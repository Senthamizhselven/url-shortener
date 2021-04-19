function copyFunction() {
    var copyText = document.getElementById('copyShort');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    console.log('copied text');
}