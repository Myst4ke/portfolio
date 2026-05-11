import React, { useEffect, useState } from "react";
import { I18nProvider, ThemeProvider } from "./i18n.jsx";
import { Header, Footer } from "./components.jsx";
import { PageScrollBar } from "./scroll-fx.jsx";
import HomePage from "./page-home.jsx";
import { SkillsPage, ExperiencePage } from "./page-skills-exp.jsx";
import { CasePage, ContactPage } from "./page-case-contact.jsx";

const PAGES = {
  home: HomePage,
  skills: SkillsPage,
  exp: ExperiencePage,
  case: CasePage,
  contact: ContactPage,
};

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const Page = PAGES[page];
  const idx = ["home", "skills", "exp", "case", "contact"].indexOf(page) + 1;

  return (
    <ThemeProvider>
      <I18nProvider>
        <div data-screen-label={`0${idx} ${page}`}>
          <PageScrollBar />
          <Header page={page} setPage={setPage} />
          <div key={page} style={{ animation: "fadeIn 320ms ease both" }}>
            <Page setPage={setPage} />
          </div>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
