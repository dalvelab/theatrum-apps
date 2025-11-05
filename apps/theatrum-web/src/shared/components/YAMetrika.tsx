/* eslint-disable @next/next/no-img-element */
import Script from "next/script"

export const YAMetrika = () => {

  if (process.env.NEXT_PUBLIC_METRIKA !== 'production') {
    return null;
  }

  return (
    <>
      <Script id='yandex-metrika-script' strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(93393151, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
        });
      `}
      </Script>
      <Script id="tianji-metrika" async defer src="https://5967043-cy54186.twc1.net/tracker.js" data-website-id="cmhlpq3xd007586e7lv961fnv"></Script>
    </>
  )
}