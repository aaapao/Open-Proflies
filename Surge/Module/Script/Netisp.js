// 2023-06-21 15:48:46
let pro={"内网":true,"本机":true,nw:true,"-----说明:可在持久化数据KeyNetisp中更改是否在面板中显示":"开为:true, 关为:false ------"};let readd=$persistentStore.read("KeyNetisp");let data;try{data=readd?JSON.parse(readd):pro}catch(t){data=pro}let loca=data.内网;let bj=data.本机;if(data.nw||typeof data.内网!=="boolean"||typeof data.本机!=="boolean"){console.log("无数据或数据错误");delete pro.nw;$persistentStore.write(JSON.stringify(pro),"KeyNetisp")}let pdldip="",outbli="",outgpt="",outld="",outik="",local="";Promise.all([(async()=>{try{const t=await tKey("http://ip-api.com/json/?lang=zh-CN",1200);let e=new Date;let s="  "+(e.getMonth()+1)+"月"+e.getDate()+" "+e.getHours()+":"+e.getMinutes();if(t.status==="success"){let{country:e,countryCode:s,query:l,city:i,org:a,as:o,tk:n}=t;pdldip=l;ast=sK(o,3);o=sK(o,2);a=sK(a,1);let r=o.split(" ")[1];let c="";if(r.toLowerCase()===a.toLowerCase()){c=ast}else{c=o+" "+a}outld=e+" "+s+":   "+l+": "+n+"ms\n"+c}else{outld=t+"\n"}if(loca){let t=$network,e=t.dns,s="";let l=t["cellular-data"]&&t["cellular-data"].radio||"";let i=t.v4.primaryAddress,a=t.v6.primaryAddress!==null?"IPv6:":"";let o=t.wifi.ssid!==null?"WiFi: ":"";const n=await tKey(`http://connectivitycheck.platform.hicloud.com/generate_204`,500);if(o!==""){for(let t=0;t<e.length;t++){if(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(e[t])){s=e[t];break}}local="内网: "+o+a+"   "+i+": "+n.tk+"ms\n"}else{local="内网: "+l+a+"   "+i+": "+n.tk+"ms\n"}}if(bj){const t=await tKey("https://api.live.bilibili.com/ip_service/v1/ip_service/get_ip_addr",500);if(t.code===0){let{addr:e,province:s,city:l,isp:i}=t.data,a=t.tk;i=i.replace(/.*广电.*/g,"广电");outbli="本机: "+s+i+":   "+e+": "+a+"ms\n"}else{outbli="Biliapi "+t+"\n"}}const l=await tKey("http://chat.openai.com/cdn-cgi/trace",1e3);const i=["CN","TW","HK","IR","KP","RU","VE","BY"];if(typeof l!=="string"){let{loc:t,tk:e,warp:s,ip:a}=l,o=i.indexOf(t),n="";if(o==-1){n="GPT: "+t+" ✓"}else{n="GPT: "+t+" ×"}if(s="plus"){s="Plus"}outgpt=n+"       ➟     Priv: "+s+"   "+e+"ms"}else{outgpt="ChatGPT "+l}const a=await httpAPI();let o;const n=a.requests.slice(0,6);let r=n.filter((t=>/\(Proxy\)/.test(t.remoteAddress)&&/ip-api\.com/.test(t.URL))).map((t=>t.remoteAddress.replace(" (Proxy)","")));if(r.length>0){o=r[0]}else{o="Noip"}let c=false,d="spe",p=false,u="edtest";isv6=false,cn=true,zl="";if(o==="Noip"){c=true}else if(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(o)){p=true}else if(/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(o)){isv6=true}if(o==pdldip){cn=false;zl="直连: "}else{zl="落地: ";if(!c||p){const t=await tKey(`https://api-v3.${d}${u}.cn/ip?ip=${o}`,500);if(t.code===0&&t.data.country=="中国"){let{province:e,isp:s,city:l}=t.data,i=t.tk;s=sK(s,4);outik="入口: "+e+s+":   "+o+": "+i+"ms\n"}else{cn=false;outik="入口IPA"+t+"\n"}}if((!c||isv6)&&!cn){const t=await tKey(`http://ip-api.com/json/${o}?lang=zh-CN`,1e3);if(t.status==="success"){let{country:e,city:s,org:l,tk:i}=t;outik="入口: "+s+l+":   "+o+": "+i+"ms\n"}else{outik="入口IPB"+t+"\n"}}}$done({title:outgpt,content:local+outbli+outik+zl+outld+s})}catch(t){$done({title:outgpt,content:local+outbli+outik+outld+zl+day})}})()]);function sM(t,e){if(t.length>e){return t.slice(0,e)}else if(t.length<e){return t.toString().padEnd(e," ")}else{return t}}function sK(t,e){return t.split(" ",e).join(" ").replace(/\.|\,|com|\u4e2d\u56fd/g,"")}async function httpAPI(t="/v1/requests/recent",e="GET",s=null){return new Promise(((l,i)=>{$httpAPI(e,t,s,(t=>{l(t)}))}))}async function tKey(t,e){let s=1,l=1;const i=new Promise(((i,a)=>{const o=async r=>{try{const s=await Promise.race([new Promise(((e,s)=>{let l=Date.now();$httpClient.get({url:t},((t,i,a)=>{if(t){s(t)}else{let t=Date.now()-l;let s=i.status;switch(s){case 200:let s=i.headers["Content-Type"];switch(true){case s.includes("application/json"):let l=JSON.parse(a);l.tk=t;e(l);break;case s.includes("text/html"):e("text/html");break;case s.includes("text/plain"):let i=a.split("\n");let o=i.reduce(((e,s)=>{let[l,i]=s.split("=");e[l]=i;e.tk=t;return e}),{});e(o);break;case s.includes("image/svg+xml"):e("image/svg+xml");break;default:e("未知");break}break;case 204:let l={tk:t};e(l);break;case 429:console.log("次数过多");e("次数过多");break;case 404:console.log("404");e("404");break;default:e("nokey");break}}}))})),new Promise(((t,s)=>{setTimeout((()=>s(new Error("timeout"))),e)}))]);if(s){i(s)}else{i("超时");a(new Error(n.message))}}catch(t){if(r<s){l++;o(r+1)}else{i("检测失败, 重试次数"+l);a(t)}}};o(0)}));return i}
