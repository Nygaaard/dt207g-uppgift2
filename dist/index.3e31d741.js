async function e(e,t,n,a){try{if(!e||!t||!n||!a)throw Error("Alla fält måste fyllas i.");if(n.length<5)throw Error("Användarnamnet måste vara minst 5 tecken långt.");if(a.length<8)throw Error("Lösenordet måste vara minst 8 tecken långt.");let r=await fetch("http://localhost:3000/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstname:e,lastname:t,username:n,password:a})});if(!r.ok)throw Error("Kunde inte registrera ny användare.");let o=await r.json();alert("Du är nu registrerad!");let l=document.getElementById("firstname"),s=document.getElementById("lastname"),i=document.getElementById("username"),d=document.getElementById("password");return l.value="",s.value="",i.value="",d.value="",o}catch(e){throw console.error("Fel vid registrering av ny användare:",e.message),e}}async function t(e,t){try{if(!e||!t)throw Error("Alla fält måste fyllas i.");let a=await fetch("http://localhost:3000/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})});if(!a.ok)throw Error("Kunde inte logga in användare.");let r=(await a.json()).response.token,o=await n(r);"Protected route"===o.message&&(alert("Du är inloggad!"),window.location.href="/my-pages")}catch(e){throw console.error("Fel vid inloggning:",e.message),e}}async function n(e){return(await fetch("http://localhost:3000/api/secret",{method:"GET",headers:{authorization:"Bearer "+e}}).then(t=>{if(console.log(t),!t.ok)throw Error("Inloggningen misslyckades");return localStorage.setItem("token",e),t}).catch(e=>{console.error("Fel vid inloggning:",e.message)})).json()}console.log("test");const a=document.getElementById("register"),r=document.getElementById("firstname"),o=document.getElementById("lastname"),l=document.getElementById("username"),s=document.getElementById("password"),i=document.getElementById("login"),d=document.getElementById("userNameLogin"),m=document.getElementById("passWordLogin"),c=document.getElementById("errMessageReg");a.addEventListener("click",function(){event.preventDefault();let t=r.value,n=o.value,a=l.value,i=s.value;(""===t||""===n||""===a||""===i)&&(c.textContent="Alla fält måste fyllas i."),e(t,n,a,i)}),i.addEventListener("click",async function(){event.preventDefault();let e=d.value,n=m.value;await t(e,n)});
//# sourceMappingURL=index.3e31d741.js.map
