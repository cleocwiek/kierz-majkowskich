/* Dodatki spoza opracowania: zdjęcia z 17 października 2026 r. (cmentarz w Płoniawach i Chodkowo Załogi).
   Ładowane po data.js; dopisują zdjęcia do kart osób i dodają historię „Płoniawy i Załogi, 2026”.
   Rekord zdjęcia: [plik, szer., wys., strona (0 = spoza opracowania), podpis]. */
(function () {
  const F = window.FAMILY; if (!F) return;
  const D = 'fot. 17.10.2026';
  const img = (f, w, h, cap) => ['c/' + f + '.webp', w, h, 0, cap + ' · ' + D];
  const I = {
    franciszek: img('grob-franciszek-feliksa', 1050, 1400, 'Grób Franciszka Majkowskiego (zm. 14 X 1936, żył lat 39) i Feliksy Majkowskiej (zm. 15 XII 1971, żyła lat 76), cmentarz w Płoniawach'),
    wawrzyniec: img('grob-wawrzyniec-marianna', 1050, 1400, 'Grób Majkowskich: Stanisław (1879–16.09.1895), Mieczysław (ur. 05.02.1895), Wawrzyniec Walerian (1855–1915) i Marianna z d. Osowska (1853–1926), cmentarz w Płoniawach'),
    braciaCm: img('plonawy-bracia-cmentarz', 1400, 1050, 'Janusz (z lewej) i Lech Majkowscy przy grobach rodziny na cmentarzu w Płoniawach'),
    kwatera: img('grob-majkowscy-kwatera', 1050, 1400, 'Kwatera Majkowskich na cmentarzu w Płoniawach; obok obelisk Kakowskich'),
    tablica: img('grob-boleslaw-irena-aleksander-teodozja', 1400, 1050, 'Tablica Majkowskich: Mikołaj Bolesław (06.12.1912–07.10.1986), Irena z d. Chodkowska (24.09.1919–02.07.1999), Halina Manicka z d. Majkowska (1922–04.08.1950), Teodozja z d. Kakowska (1892–02.08.1951), Aleksander (24.01.1885–24.08.1955)'),
    tablica2: img('grob-boleslaw-irena-2', 1400, 1050, 'Ta sama tablica Majkowskich z boku, z krzyżem'),
    kakowscy: img('grob-kakowscy', 1050, 1400, 'Obelisk Kakowskich: Stanisław Dionizy Kakowski (zm. 1931), Marianna Kakowska z Olszewskich, Wincenty Żebrowski (zm. 23.09.1956), Zofia Żebrowska z Kakowskich (zm. 05.06.1959), Gustaw Pszczółkowski (zm. 25.10.1933), Helena Kierzkowska z Kakowskich (zm. 30.07.1958)'),
    krystyna: img('grob-krystyna-kobylinska', 1050, 1400, 'Grób Krystyny Majkowskiej-Kobylińskiej (zm. 25.11.1986, żyła lat 62), Leona Kobylińskiego (zm. 15.10.1954, żył lat 32) i ich synka Stasia (zm. 15.10.1954, żył 1 rok i 4 miesiące)'),
    krepscy: img('grob-krepscy', 1050, 1400, 'Grób Krępskich: Jan Krępski (1870–1953), Jan Franciszek Krępski (1902–1962), Stanisława Krępska z d. Majkowska (1910–1987), Bożena Jabłońska z d. Krępska (1931–2011)'),
    mieczyslaw: img('grob-mieczyslaw-krepski', 1050, 1400, 'Grób Mieczysława Krępskiego (zm. 17.01.2015, żył lat 65)'),
    chodDominik: img('grob-chodkowscy-dominik', 1050, 1400, 'Grób Chodkowskich: Dominik (zm. 18.04.1935, żył lat 73), Bronisław, Zenobiusz, Henryk oraz Marianna Gutowska (zm. 25.01.1927)'),
    chodKazimierz: img('grob-chodkowscy-kazimierz', 1400, 1050, 'Grób Chodkowskich: Kazimierz, Teofila, Stanisława, Barbara Chodkowska-Granicka, Bolesław, Józefa, Kazimiera'),
    chodAnna: img('grob-chodkowscy-anna', 1050, 1400, 'Grób Chodkowskich: Anna (zm. 1969), Marian (zm. 1994), Elżbieta (zm. 2004)'),
    bracia: img('bracia-zalogi-2026', 1400, 1050, 'Bracia Majkowscy w Chodkowo Załogach, od lewej: Lech, Tadeusz i Janusz'),
    pole: img('pole-zalogi-2026', 1400, 1050, 'Pole rodziny Majkowskich w Chodkowo Załogach (13,7 ha); po lewej Tadeusz, po prawej Janusz')
  };
  const byId = {}; F.people.forEach(p => byId[p.id] = p);
  const add = (id, ...recs) => { const p = byId[id]; if (p) p.imgs.unshift(...recs); };
  // Karolina Ćwiek: nowe zdjęcie zamiast zdjęcia z opracowania
  if (byId['65']) byId['65'].imgs = [['c/karolina-cwiek.webp', 1195, 1400, 0, 'Karolina Ćwiek']];
  add('24', I.wawrzyniec);
  add('25', I.wawrzyniec);
  add('103', I.wawrzyniec);
  add('104', I.franciszek);
  add('37', I.tablica, I.kakowscy);
  add('62', I.tablica);
  add('89', I.tablica);
  add('96', I.krystyna);
  add('97', I.krystyna);
  add('38', I.krepscy);
  add('39', I.krepscy);
  add('51', I.mieczyslaw);
  add('63', I.bracia, I.pole, I.braciaCm);
  add('68', I.bracia, I.braciaCm);
  add('72', I.bracia, I.pole);

  const P = (p) => ({ p });
  const G = (r) => ({ img: r });
  F.stories.push({
    id: 'wizyta2026', title: 'Płoniawy i Załogi, 2026', date: '17 października 2026',
    lead: 'Groby rodziny na cmentarzu w Płoniawach i rodzinne pole w Chodkowo Załogach. Zdjęcia z wizyty braci Janusza, Lecha i Tadeusza Majkowskich.',
    people: ['24', '37', '62', '104', '38', '96', '63', '68', '72'],
    blocks: [
      P('17 października 2026 roku bracia Janusz, Lech i Tadeusz Majkowscy byli w Chodkowo Załogach i na cmentarzu parafialnym w Płoniawach, gdzie pochowane są kolejne pokolenia rodziny z Załóg.'),
      G(I.bracia), G(I.pole),
      P('Cmentarz w Płoniawach: groby Majkowskich.'),
      G(I.wawrzyniec), G(I.franciszek), G(I.kwatera), G(I.tablica), G(I.tablica2), G(I.braciaCm),
      P('Rodziny skoligacone: Kakowscy (rodzina Teodozji), Krępscy (rodzina Stanisławy z Majkowskich), Kobylińscy (rodzina Krystyny z Majkowskich) i Chodkowscy.'),
      G(I.kakowscy), G(I.krepscy), G(I.mieczyslaw), G(I.krystyna), G(I.chodDominik), G(I.chodKazimierz), G(I.chodAnna)
    ]
  });
})();
