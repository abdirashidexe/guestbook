let button = document.getElementById("backBtn");
let adminLink = document.getElementById("adminLink");

if (button)
{
    button.onclick = function()
    {
        window.location.href= '/';
    };
}

adminLink.onclick = function()
{
    window.location.href= '/admin';
};