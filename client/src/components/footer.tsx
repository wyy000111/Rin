import { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useLocation } from 'wouter';
import { ClientConfigContext } from '../state/config';
import { Helmet } from "react-helmet";
import { siteName } from '../utils/constants';
import { useTranslation } from "react-i18next";

type ThemeMode = 'light' | 'dark' | 'system';
function Footer() {
    const { t } = useTranslation()
    const [, setLocation] = useLocation()
    const [modeState, setModeState] = useState<ThemeMode>('system');
    const config = useContext(ClientConfigContext);
    const footerHtml = config.get<string>('footer');
    const loginEnabled = config.get<boolean>('login.enabled');
    const [doubleClickTimes, setDoubleClickTimes] = useState(0);
    useEffect(() => {
        const mode = localStorage.getItem('theme') as ThemeMode || 'system';
        setModeState(mode);
        setMode(mode);
    }, [])

    const setMode = (mode: ThemeMode) => {
        setModeState(mode);
        localStorage.setItem('theme', mode);


        if (mode !== 'system' || (!('theme' in localStorage) && window.matchMedia(`(prefers-color-scheme: ${mode})`).matches)) {
            document.documentElement.setAttribute('data-color-mode', mode);
        } else {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            if (mediaQuery.matches) {
                document.documentElement.setAttribute('data-color-mode', 'dark');
            } else {
                document.documentElement.setAttribute('data-color-mode', 'light');
            }
        }
        window.dispatchEvent(new Event("colorSchemeChange"));
    };

    return (
        <footer>
            <Helmet>
                <link rel="alternate" type="application/rss+xml" title={siteName} href="/rss.xml" />
                <link rel="alternate" type="application/atom+xml" title={siteName} href="/atom.xml" />
                <link rel="alternate" type="application/json" title={siteName} href="/rss.json" />
            </Helmet>
            <div className="flex flex-col mb-8 space-y-2 justify-center items-center t-primary ani-show">
                {footerHtml && <div dangerouslySetInnerHTML={{ __html: footerHtml }} />}


<div className="mx-auto items-center text-center">
<iframe src="https://comment.19781126.xyz/embed/area/www?theme=light&lang=zh-CN"  
name="评论" 
width="1080"
width="90%"
height="auto"
frameBorder="0"
scrolling="auto">
</iframe>
 <p>
    Powered by 💝💝💝
<a href="https://cloudflare.com/" rel="noopener noreferrer" target="_blank">赛博菩萨</a>；
  <a href="https://github.com/" rel="noopener noreferrer" target="_blank">小黄人</a>；
  <a href="https://www.cloudns.net/" rel="noopener noreferrer" target="_blank">CloudNS</a>；
  <a href="https://account.proton.me/mail" rel="noopener noreferrer" target="_blank">Proton Mail</a>；💝💝💝
</p>
   <p>
   🛠️🛠️🛠️网站联盟（自用）：
    <a href="https://imgbed.19781126.xyz/" rel="noopener noreferrer" target="_blank">图床</a>；
    <a href="https://paste.19781126.xyz/" rel="noopener noreferrer" target="_blank">网盘/WebDav</a>；
     <a href="https://panhub.19781126.xyz/" rel="noopener noreferrer" target="_blank">网盘搜索</a>；
    <a href="https://tv.19781126.xyz/" rel="noopener noreferrer" target="_blank">在线TV</a>；
    <a href="https://www.19781126.xyz/" rel="noopener noreferrer" target="_blank">博客</a>；
    <a href="https://media.19781126.xyz/" rel="noopener noreferrer" target="_blank">多媒体博客</a>；
    <a href="https://github.19781126.xyz/" rel="noopener noreferrer" target="_blank">GH加速</a>；
    <a href="https://comment.19781126.xyz/" rel="noopener noreferrer" target="_blank">评论</a>；
    <a href="https://mail.19781126.xyz/" rel="noopener noreferrer" target="_blank">邮箱</a>；
    <a href="https://epush.19781126.xyz/" rel="noopener noreferrer" target="_blank">消息推送</a>；🛠️🛠️🛠️
 </p>
 <hr />
</div>          

                
                <p className='text-sm text-neutral-500 font-normal link-line'>
                    <span onDoubleClick={() => {
                        if(doubleClickTimes >= 2){ // actually need 3 times doubleClick
                            setDoubleClickTimes(0)
                            if(!loginEnabled) {
                                setLocation('/login')
                            }
                        } else {
                            setDoubleClickTimes(doubleClickTimes + 1)
                        }
                    }}>
                        © {new Date().getFullYear()} Powered by <a className='hover:underline' href="https://github.com/openRin/Rin" target="_blank">Rin</a>
                    </span>
                    {config.get<boolean>('rss') && <>
                        <Spliter />
                        <Popup trigger={
                            <button className="hover:underline" type="button">
                                RSS
                            </button>
                        }
                            position="top center"
                            arrow={false}
                            closeOnDocumentClick>
                            <div className="border-card">
                                <p className='font-bold t-primary'>
                                    {t('footer.rss')}
                                </p>
                                <p>
                                    <a href='/rss.xml'>
                                        RSS
                                    </a> <Spliter />
                                    <a href='/atom.xml'>
                                        Atom
                                    </a> <Spliter />
                                    <a href='/rss.json'>
                                        JSON
                                    </a>
                                </p>

                            </div>
                        </Popup>
                    </>}
                </p>
                <div className="w-fit-content inline-flex rounded-full border border-zinc-200 p-[3px] dark:border-zinc-700">
                    <ThemeButton mode='light' current={modeState} label="Toggle light mode" icon="ri-sun-line" onClick={setMode} />
                    <ThemeButton mode='system' current={modeState} label="Toggle system mode" icon="ri-computer-line" onClick={setMode} />
                    <ThemeButton mode='dark' current={modeState} label="Toggle dark mode" icon="ri-moon-line" onClick={setMode} />
                </div>
            </div>
        </footer>
    );
}

function Spliter() {
    return (<span className='px-1'>
        |
    </span>
    )
}

function ThemeButton({ current, mode, label, icon, onClick }: { current: ThemeMode, label: string, mode: ThemeMode, icon: string, onClick: (mode: ThemeMode) => void }) {
    return (<button aria-label={label} type="button" onClick={() => onClick(mode)}
        className={`rounded-inherit inline-flex h-[32px] w-[32px] items-center justify-center border-0 t-primary ${current === mode ? "bg-w rounded-full shadow-xl shadow-light" : ""}`}>
        <i className={`${icon}`} />
    </button>)
}

export default Footer;
