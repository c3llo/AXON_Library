"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VOICES } from "./data/voices.js";
import IMAGE_STYLE_CATALOG from "./data/imageStyles.json";

type Tab = "programs" | "voice" | "image";
type Voice = (typeof VOICES)[number];
type CopyState = { id: string; status: "copied" | "error" } | null;

const IMAGE_STYLES = IMAGE_STYLE_CATALOG.styles.map((style) => ({
  ...style,
  imageUrl: `/image-styles/${style.id}.webp`,
  promptUrl: `/image-styles/${style.promptFile}`,
}));

const PROGRAMS = [
  {
    index: "01",
    name: "AXON Studio",
    eyebrow: "ALL-IN-ONE CREATOR SUITE",
    version: "v0.9.44",
    date: "2026. 7. 15",
    size: "89.7 MB",
    description:
      "영상 제작 워크플로를 하나로 연결하는 AXON의 핵심 제작 도구. 스크립트부터 음성, 이미지, 자막까지 효율적으로 완성하세요.",
    releaseNote:
      "Vrew 저장 오류 안내 개선, 캡컷 자막 위치 조정, 나이 발음 변환 오류 수정",
    accent: "blue",
    releaseUrl: "https://github.com/c3llo/AXON_Studio_Release/releases",
    downloadUrl:
      "https://github.com/c3llo/AXON_Studio_Release/releases/download/v0.9.44/AXON_Studio.exe",
  },
  {
    index: "02",
    name: "AXON StoryLab",
    eyebrow: "STORY DEVELOPMENT WORKSPACE",
    version: "v0.1.0",
    date: "2026. 7. 14",
    size: "88.8 MB",
    description:
      "아이디어를 구조화하고 이야기를 발전시키는 창작 워크스페이스. 저장과 불러오기를 중심으로 제작의 첫 단계를 정리하세요.",
    releaseNote:
      "타이틀, 회원 구분, 초기화·불러오기·저장, 설정, 구글 로그인 기본 골격 공개",
    accent: "violet",
    releaseUrl: "https://github.com/c3llo/AXON_StoryLab_Release/releases",
    downloadUrl:
      "https://github.com/c3llo/AXON_StoryLab_Release/releases/download/v0.1.0/AXON_StoryLab.exe",
  },
] as const;

function DownloadIcon() {
  return <span aria-hidden="true">↓</span>;
}

export default function AxonLibrary() {
  const [activeTab, setActiveTab] = useState<Tab>("programs");
  const [category, setCategory] = useState<"male" | "female">("male");
  const [provider, setProvider] = useState<"all" | "TypeCast" | "ElevenLabs">("all");
  const [query, setQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [styleCopyState, setStyleCopyState] = useState<CopyState>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredVoices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return VOICES.filter((voice) => voice.category === category)
      .filter((voice) => provider === "all" || voice.provider === provider)
      .filter(
        (voice) =>
          !normalizedQuery ||
          voice.name.toLowerCase().includes(normalizedQuery) ||
          voice.description.toLowerCase().includes(normalizedQuery),
      );
  }, [category, provider, query]);

  useEffect(() => {
    return () => audioRef.current?.pause();
  }, []);

  function selectTab(tab: Tab) {
    setActiveTab(tab);
    if (tab !== "voice") {
      audioRef.current?.pause();
      setPlayingId(null);
    }
  }

  function toggleVoice(voice: Voice) {
    if (playingId === voice.id && audioRef.current) {
      audioRef.current.pause();
      setPlayingId(null);
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(voice.file);
    audioRef.current = audio;
    audio.addEventListener("ended", () => setPlayingId(null), { once: true });
    void audio.play();
    setPlayingId(voice.id);
  }

  async function copyVoiceId(voice: Voice) {
    await navigator.clipboard.writeText(voice.voiceId);
    setCopiedId(voice.id);
    window.setTimeout(() => setCopiedId(null), 1400);
  }

  async function copyImageStyle(style: (typeof IMAGE_STYLES)[number]) {
    try {
      const response = await fetch(style.promptUrl);
      if (!response.ok) throw new Error(`스타일 파일을 불러오지 못했습니다. (${response.status})`);
      await navigator.clipboard.writeText(await response.text());
      setStyleCopyState({ id: style.id, status: "copied" });
    } catch {
      setStyleCopyState({ id: style.id, status: "error" });
    }

    window.setTimeout(() => {
      setStyleCopyState((current) => current?.id === style.id ? null : current);
    }, 1600);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <button className="brand" type="button" onClick={() => selectTab("programs")}>
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            <strong>AXON</strong>
            <small>SOFTWARE LIBRARY</small>
          </span>
        </button>

        <nav className="main-tabs" role="tablist" aria-label="AXON 라이브러리">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "programs"}
            className={activeTab === "programs" ? "active" : ""}
            onClick={() => selectTab("programs")}
          >
            프로그램
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "voice"}
            className={activeTab === "voice" ? "active" : ""}
            onClick={() => selectTab("voice")}
          >
            Voice
            <span className="tab-badge">92</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "image"}
            className={activeTab === "image" ? "active" : ""}
            onClick={() => selectTab("image")}
          >
            이미지
            <span className="tab-badge">{IMAGE_STYLES.length}</span>
          </button>
        </nav>

        <div className="header-status">
          <span className="status-dot" />
          ALL SYSTEMS READY
        </div>
      </header>

      {activeTab === "programs" && (
        <section className="programs-view" role="tabpanel">
          <div className="hero">
            <div>
              <p className="section-kicker"><span /> AXON ECOSYSTEM</p>
              <h1>당신의 AXON,<br /><em>한곳에서.</em></h1>
            </div>
            <p className="hero-copy">
              콘텐츠 제작을 위해 설계된 AXON의 모든 프로그램을<br className="desktop-only" />
              확인하고, 언제나 최신 버전을 다운로드하세요.
            </p>
          </div>

          <div className="program-grid">
            {PROGRAMS.map((program) => (
              <article className={`program-card ${program.accent}`} key={program.name}>
                <div className="program-topline">
                  <span>{program.index}</span>
                  <span className="platform-pill">WINDOWS</span>
                </div>

                <div className="program-identity">
                  <div className="program-glyph" aria-hidden="true">
                    {program.index === "01" ? "A" : "S"}
                  </div>
                  <div>
                    <p>{program.eyebrow}</p>
                    <h2>{program.name}</h2>
                  </div>
                </div>

                <p className="program-description">{program.description}</p>

                <div className="release-summary">
                  <span>WHAT&apos;S NEW</span>
                  <p>{program.releaseNote}</p>
                </div>

                <dl className="release-meta">
                  <div><dt>LATEST</dt><dd>{program.version}</dd></div>
                  <div><dt>RELEASED</dt><dd>{program.date}</dd></div>
                  <div><dt>SIZE</dt><dd>{program.size}</dd></div>
                </dl>

                <div className="program-actions">
                  <a className="download-button" href={program.downloadUrl}>
                    <DownloadIcon /> 최신 버전 다운로드
                  </a>
                  <a className="release-link" href={program.releaseUrl} target="_blank" rel="noreferrer">
                    전체 릴리즈 보기 <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="program-footnote">
            <span>02 PROGRAMS</span>
            <p>프로그램 카드는 GitHub Release의 최신 공개 버전을 기준으로 업데이트됩니다.</p>
          </div>
        </section>
      )}

      {activeTab === "voice" && (
        <section className="voice-view" role="tabpanel">
          <div className="voice-heading">
            <div>
              <p className="section-kicker"><span /> AXON VOICE LIBRARY</p>
              <h1>목소리를 고르는<br /><em>가장 빠른 방법.</em></h1>
            </div>
            <p>
              TypeCast와 ElevenLabs의 음성을 직접 듣고,<br className="desktop-only" />
              voice ID를 복사하거나 샘플을 다운로드하세요.
            </p>
          </div>

          <div className="voice-toolbar">
            <div className="gender-tabs" role="group" aria-label="음성 성별">
              <button type="button" className={category === "male" ? "active" : ""} onClick={() => setCategory("male")}>남자 <span>48</span></button>
              <button type="button" className={category === "female" ? "active" : ""} onClick={() => setCategory("female")}>여자 <span>44</span></button>
            </div>

            <div className="provider-tabs" role="group" aria-label="음성 제공자">
              {(["all", "TypeCast", "ElevenLabs"] as const).map((item) => (
                <button key={item} type="button" className={provider === item ? "active" : ""} onClick={() => setProvider(item)}>
                  {item === "all" ? "전체" : item}
                </button>
              ))}
            </div>

            <label className="voice-search">
              <span aria-hidden="true">⌕</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이름 또는 스타일 검색" />
            </label>
          </div>

          <div className="voice-result-line">
            <span>{filteredVoices.length.toString().padStart(2, "0")} VOICES</span>
            <span className="rule" />
          </div>

          <div className="voice-grid">
            {filteredVoices.map((voice) => {
              const isPlaying = playingId === voice.id;
              const isCopied = copiedId === voice.id;
              return (
                <article className={`voice-card ${isPlaying ? "playing" : ""}`} key={voice.id}>
                  <button className="voice-play" type="button" onClick={() => toggleVoice(voice)} aria-label={`${voice.name} ${isPlaying ? "일시정지" : "재생"}`}>
                    <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
                  </button>
                  <div className="voice-info">
                    <div className="voice-name-line"><h2>{voice.name}</h2><span>{voice.provider}</span></div>
                    <p>{voice.description || (voice.provider === "TypeCast" ? "Korean voice" : "Voice sample")}</p>
                  </div>
                  <div className="voice-actions">
                    <button type="button" className={isCopied ? "copied" : ""} onClick={() => copyVoiceId(voice)}>
                      <code>{voice.voiceId}</code>
                      <span>{isCopied ? "복사됨" : "복사"}</span>
                    </button>
                    <a href={voice.file} download={`${voice.name}.mp3`} aria-label={`${voice.name} mp3 다운로드`}><DownloadIcon /></a>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredVoices.length === 0 && (
            <div className="empty-state"><strong>검색 결과가 없습니다.</strong><span>다른 이름이나 음성 스타일을 입력해보세요.</span></div>
          )}
        </section>
      )}

      {activeTab === "image" && (
        <section className="image-view" role="tabpanel">
          <div className="image-heading">
            <div>
              <p className="section-kicker"><span /> AXON IMAGE STYLE LIBRARY</p>
              <h1>그림체를 보고,<br /><em>바로 복사하세요.</em></h1>
            </div>
            <p>
              AXON Studio의 추천 이미지 스타일을 미리 보고,<br className="desktop-only" />
              원하는 스타일의 전체 프롬프트를 한 번에 복사하세요.
            </p>
          </div>

          <div className="image-result-line">
            <span>{IMAGE_STYLES.length.toString().padStart(2, "0")} IMAGE STYLES</span>
            <span className="rule" />
          </div>

          <div className="image-style-library-grid">
            {IMAGE_STYLES.map((style, index) => {
              const copyState = styleCopyState?.id === style.id ? styleCopyState.status : null;
              return (
                <article className="image-library-card" key={style.id}>
                  <div className="image-library-preview">
                    {/* Static public assets are used directly because vinext does not provide Next's image optimizer. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={style.imageUrl}
                      alt={`${style.name} 그림체 예시`}
                      width={640}
                      height={360}
                      loading="lazy"
                    />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="image-library-content">
                    <h2>{style.name}</h2>
                    <p>{style.visualSummary}</p>
                    <button
                      type="button"
                      className={copyState ? copyState : ""}
                      onClick={() => copyImageStyle(style)}
                    >
                      <span aria-hidden="true">{copyState === "copied" ? "✓" : "▣"}</span>
                      {copyState === "copied"
                        ? "복사되었습니다"
                        : copyState === "error"
                          ? "복사하지 못했습니다"
                          : "그림체 스타일 복사"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <footer>
        <span>AXON SOFTWARE LIBRARY</span>
        <span>BUILD BETTER. CREATE FASTER.</span>
        <span>© 2026 AXON</span>
      </footer>
    </main>
  );
}
