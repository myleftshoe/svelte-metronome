export default function(uri){
    return new Promise((resolve, reject) => {
        const tag = document.createElement('script');
        tag.src = uri;
        tag.async = true;
        tag.onload = () => {resolve();};
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
}