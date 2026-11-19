function openInvitation(){document.body.classList.add('invite-open');document.getElementById('invitation').scrollIntoView({behavior:'smooth',block:'start'});}
const openButton=document.getElementById('openInvite');
const audio=document.getElementById('song');
let musicStarted=false;
openButton.addEventListener('click',async()=>{
  openInvitation();
  if(musicStarted)return;
  try{
    audio.currentTime=0;
    await audio.play();
    musicStarted=true;
  }catch(e){
    musicStarted=false;
    // The opening button is the user's gesture; a second tap retries if the browser blocks playback.
  }
});
const weddingTime=new Date('2026-12-04T17:00:00+02:00').getTime();
function updateCountdown(){let left=Math.max(0,weddingTime-Date.now());const vals=[Math.floor(left/86400000),Math.floor(left/3600000)%24,Math.floor(left/60000)%60,Math.floor(left/1000)%60];['days','hours','minutes','seconds'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(vals[i]).padStart(2,'0')})}
updateCountdown();setInterval(updateCountdown,1000);
document.getElementById('calendarButton').addEventListener('click',()=>{const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Saad and Fatima//Wedding//AR','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:saad-fatima-wedding-20261204@invitation.local','DTSTAMP:20261112T140000Z','DTSTART;TZID=Africa/Cairo:20261204T170000','DTEND;TZID=Africa/Cairo:20261204T230000','SUMMARY:زفاف سعد وفاطمة','LOCATION:فيلا نعمة، المريوطية','DESCRIPTION:يسعدنا مشاركتكم فرحتنا','BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:تذكير: غدًا حفل زفاف سعد وفاطمة','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Saad-Fatima-Wedding.ics';a.click();URL.revokeObjectURL(url)});
function makePetal(){if(!document.body.classList.contains('invite-open'))return;const p=document.createElement('span');p.className='petal';p.textContent=Math.random()>.5?'✿':'❀';p.style.left=Math.random()*100+'%';p.style.fontSize=(10+Math.random()*10)+'px';p.style.setProperty('--drift',(Math.random()*130-65)+'px');p.style.animationDuration=(10+Math.random()*9)+'s';document.querySelector('.petals').appendChild(p);setTimeout(()=>p.remove(),20000)}setInterval(makePetal,1250);

// Share the invitation using the device's WhatsApp share flow.
document.getElementById('shareButton').addEventListener('click',()=>{const message='يسعدنا دعوتكم لحضور حفل زفاف سعد وفاطمة يوم 4 ديسمبر 2026 في فيلا نعمة - المريوطية. نتشرف بوجودكم معنا!';const url='https://wa.me/?text='+encodeURIComponent(message+' '+window.location.href);window.open(url,'_blank','noopener,noreferrer')});


// Submit guestbook entries to the private Google Form in a hidden iframe,
// keeping guests on this same invitation page.
const guestForm=document.getElementById('guestbookForm');
if(guestForm){
  const guestMessage=guestForm.querySelector('textarea[name="entry.865837579"]');
  const guestName=guestForm.querySelector('input[name="entry.977974021"]');
  const guestCount=document.getElementById('guestCharacterCount');
  const guestStatus=document.getElementById('guestStatus');
  const guestSubmit=document.getElementById('guestSubmit');
  const guestFrame=document.getElementById('guestbookFrame');
  let guestSubmissionPending=false;
  const updateGuestCount=()=>{guestCount.textContent=guestMessage.value.length+' / 300';};
  guestMessage.addEventListener('input',updateGuestCount);
  guestForm.addEventListener('submit',(event)=>{
    if(!guestName.value.trim()||!guestMessage.value.trim()){
      event.preventDefault();
      guestStatus.textContent='من فضلك اكتب اسمك والتهنئة.';
      return;
    }
    guestName.value=guestName.value.trim();
    guestMessage.value=guestMessage.value.trim();
    guestSubmissionPending=true;
    guestSubmit.disabled=true;
    guestStatus.textContent='جاري إرسال تهنئتك...';
    window.setTimeout(()=>{
      if(guestSubmissionPending){
        guestSubmissionPending=false;
        guestSubmit.disabled=false;
        guestStatus.textContent='لو لم تظهر رسالة التأكيد، يمكنك المحاولة مرة أخرى.';
      }
    },12000);
  });
  guestFrame.addEventListener('load',()=>{
    if(!guestSubmissionPending)return;
    guestSubmissionPending=false;
    guestSubmit.disabled=false;
    guestForm.reset();
    updateGuestCount();
    guestStatus.textContent='شكرًا لك، تم إرسال تهنئتك لسعد وفاطمة ❤️';
  });
}
