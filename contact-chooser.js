/* Khanyi in Motion: contact channel picker. No channel is selected by default. */
(() => {
  "use strict";

  const whatsapp = "https://wa.me/27787627085?s=p";
  const channels = [
    { name: "WhatsApp", subtitle: "Send me a direct message", href: whatsapp, icon: "/assets/brand/whatsapp.svg", external: true },
    { name: "Instagram", subtitle: "Connect via Instagram DM", href: "https://www.instagram.com/khanyiinmotion/", icon: "/assets/brand/instagram.svg", external: true },
    { name: "Email", subtitle: "Write to my Outlook inbox", href: "mailto:siyabonga.khanyi@outlook.com", icon: "/assets/brand/outlook.svg", external: false },
    { name: "LinkedIn", subtitle: "Connect professionally", href: "https://www.linkedin.com/in/siyabonga-k-4043a017b/", icon: "/assets/brand/linkedin.svg", external: true }
  ];
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg>';

  function init() {
    const current = document.querySelector('#collaborate a.pill[href*="instagram.com"]');
    if (!current || document.getElementById('contact-channel-dialog')) return;

    const styles = document.createElement('style');
    styles.textContent = `
      .contact .pill.contact-chooser-trigger{font-family:inherit;cursor:pointer;text-align:left}
      .contact .pill.contact-chooser-trigger svg{width:22px;height:22px;flex:none}
      .contact-channel-dialog{color:var(--ink,#171717);background:var(--cream,#f3eee5);border:2px solid var(--ink,#171717);padding:0;width:min(560px,calc(100vw - 30px));max-width:560px;max-height:min(740px,calc(100dvh - 30px));box-shadow:12px 12px 0 rgba(0,0,0,.22)}
      .contact-channel-dialog::backdrop{background:rgba(0,0,0,.74);backdrop-filter:blur(4px)}
      .contact-channel-panel{padding:clamp(22px,5vw,36px);overflow-y:auto;max-height:calc(100dvh - 34px)}
      .contact-channel-top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px}
      .contact-channel-eyebrow{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
      .contact-channel-close{width:36px;height:36px;border:1.5px solid currentColor;color:inherit;background:transparent;display:grid;place-items:center;cursor:pointer}
      .contact-channel-close svg{width:17px;height:17px}
      .contact-channel-dialog h2{font-family:var(--display,inherit);font-size:clamp(32px,6vw,54px);font-weight:800;line-height:.96;letter-spacing:-.045em;text-transform:uppercase;margin:0 0 16px}
      .contact-channel-dialog p{font-size:15px;line-height:1.5;margin:0 0 26px;max-width:370px}
      .contact-channel-list{display:grid;gap:10px}
      .contact-channel-option{border:1.5px solid var(--ink,#171717);padding:16px;display:flex;align-items:center;gap:16px;color:inherit;text-decoration:none;min-height:79px;transition:background-color .18s,color .18s}
      .contact-channel-option:hover,.contact-channel-option:focus-visible{background:var(--ink,#171717);color:var(--cream,#fff)}
      .contact-channel-option:focus-visible,.contact-channel-close:focus-visible,.contact-chooser-trigger:focus-visible{outline:3px solid #225dbb;outline-offset:3px}
      .contact-channel-option img{height:26px;width:26px;object-fit:contain;flex:none}
      .contact-channel-option-text{display:grid;gap:3px;min-width:0}
      .contact-channel-option-text strong{font-size:16px;font-weight:800}
      .contact-channel-option-text small{font-size:12px;opacity:.75;line-height:1.4}
      .contact-channel-option>svg{margin-left:auto;width:21px;height:21px;flex:none}
      @media (max-width:500px){.contact-channel-panel{padding:22px}.contact-channel-option{min-height:74px;padding:13px}.contact-channel-dialog{box-shadow:6px 6px 0 rgba(0,0,0,.22)}.contact .pill.contact-chooser-trigger{gap:20px}}
    `;
    document.head.appendChild(styles);

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = 'start-conversation';
    trigger.className = 'pill contact-chooser-trigger';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'contact-channel-dialog');
    trigger.innerHTML = '<span>Start a conversation</span>' + arrow;
    current.replaceWith(trigger);

    const dialog = document.createElement('dialog');
    dialog.id = 'contact-channel-dialog';
    dialog.className = 'contact-channel-dialog';
    dialog.setAttribute('aria-labelledby', 'contact-channel-title');
    dialog.setAttribute('aria-describedby', 'contact-channel-description');
    dialog.innerHTML = `
      <div class="contact-channel-panel">
        <div class="contact-channel-top">
          <span class="contact-channel-eyebrow">Choose your channel</span>
          <button class="contact-channel-close" type="button" aria-label="Close contact options"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg></button>
        </div>
        <h2 id="contact-channel-title">Let's talk.</h2>
        <p id="contact-channel-description">How would you like to start a conversation? Choose your preferred platform.</p>
        <div class="contact-channel-list">
          ${channels.map(channel => `
            <a class="contact-channel-option" href="${channel.href}" ${channel.external ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="Start a conversation via ${channel.name}">
              <img src="${channel.icon}" alt="" aria-hidden="true" />
              <span class="contact-channel-option-text"><strong>${channel.name}</strong><small>${channel.subtitle}</small></span>
              ${arrow}
            </a>
          `).join('')}
        </div>
      </div>`;
    document.body.appendChild(dialog);

    trigger.addEventListener('click', () => {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else { dialog.setAttribute('open', ''); dialog.querySelector('.contact-channel-close').focus(); }
    });
    dialog.querySelector('.contact-channel-close').addEventListener('click', () => {
      if (typeof dialog.close === 'function') dialog.close();
      else { dialog.removeAttribute('open'); trigger.focus(); }
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog && typeof dialog.close === 'function') dialog.close();
    });
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && typeof dialog.close !== 'function') {
        dialog.removeAttribute('open');
        trigger.focus();
      }
    });
    dialog.querySelectorAll('.contact-channel-option').forEach(link => {
      link.addEventListener('click', () => {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      });
    });

    const socials = document.querySelector('footer .social');
    if (socials && !socials.querySelector('a[href*="wa.me/"]')) {
      const social = document.createElement('a');
      social.href = whatsapp;
      social.target = '_blank';
      social.rel = 'noopener noreferrer';
      social.setAttribute('aria-label', 'Chat with Siya Khanyi on WhatsApp');
      social.innerHTML = '<img class="brand-icon" src="/assets/brand/whatsapp.svg" alt="" aria-hidden="true">WhatsApp ' + arrow;
      socials.insertBefore(social, socials.firstChild);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
