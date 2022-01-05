export const canvas = document.getElementById("bounce");
export default function main(canvas){
    const context = canvas.getContext("2d");

    window.addEventListener('keypress', (event) =>{
        if(event.code == "Enter" ){
            document.querySelector(".canvas-cover").style.display = "none";
        }

    });
};
main(canvas);

