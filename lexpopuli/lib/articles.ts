export type Article = {
  id: string
  paragraphId: string  // np. "1", "2" itd.
  paragraph: string    // np. "§ 1"
  artNum: string       // np. "Art. 1."
  title: string        // tytuł paragrafu
  text: string         // treść artykułu
  chapter: string
  stars: number
  order: number
}

export type Paragraph = {
  id: string
  paragraph: string
  title: string
  chapter: string
  stars: number
  order: number
  articles: Article[]
}

export const CHAPTERS = [
  'Preambuła',
  'Rozdział I — Zasady Ustrojowe: Naród jako Suweren',
  'Rozdział II — Prawa i Wolności Obywatelskie',
  'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu',
  'Rozdział IV — Kontrola Władzy przez Naród',
  'Rozdział V — Praworządność',
  'Rozdział VI — Zmiana Konstytucji',
  'Rozdział VII — Postanowienia Końcowe',
]

// Każdy artykuł jako osobny rekord z ID w formacie "paragraf-artykuł" np. "1-1", "1-2"
export const ARTICLES: Article[] = [
  // PREAMBUŁA
  { id: 'p0-0', paragraphId: 'p0', paragraph: 'Preambuła', artNum: '', title: 'Preambuła', chapter: 'Preambuła', stars: 5, order: 0,
    text: 'My, Naród Polski — świadomi, że władza w Rzeczypospolitej pochodzi wyłącznie od Narodu i służy wyłącznie Narodowi; przekonani, że państwo jest dobrowolnym narzędziem stworzonym przez ludzi dla ludzi — nie instytucją nadrzędną wobec swoich twórców; pamiętając ofiary i walkę wszystkich pokoleń, które broniły wolności, godności i prawa do stanowienia o sobie; zakorzenieni w ponad tysiącletniej tradycji chrześcijańskiej i katolickiej, która ukształtowała tożsamość, kulturę i etykę Narodu Polskiego — tradycji otwartej, szanującej godność każdego człowieka niezależnie od jego wyznania; dążąc do trwałego zabezpieczenia godności każdego człowieka, równości szans, wolności jednostki i dobrostanu przyszłych pokoleń; pragnąc państwa, które chroni wolność, nie ogranicza jej; które służy obywatelom, nie panuje nad nimi; które nagradza pracowitość i przedsiębiorczość, nie karze sukcesu — zawieramy niniejszy Kontrakt Społeczny, ustanawiając Konstytucję Rzeczypospolitej Polskiej jako najwyższe prawo Narodu i wiążące zobowiązanie wszystkich władz publicznych wobec obywateli.\n\nŻadna władza — ustawodawcza, wykonawcza ani sądownicza — nie jest źródłem praw człowieka. Prawa te są przyrodzone i niezbywalne. Konstytucja jedynie je potwierdza i chroni.' },

  // § 1 SUWERENNOŚĆ NARODU
  { id: '1-1', paragraphId: '1', paragraph: '§ 1', artNum: 'Art. 1.', title: 'Suwerenność Narodu', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 101,
    text: 'Rzeczpospolita Polska jest dobrem wspólnym wszystkich obywateli. Naród Polski jest jedynym i niepodzielnym suwerenem — źródłem wszelkiej władzy publicznej.' },
  { id: '1-2', paragraphId: '1', paragraph: '§ 1', artNum: 'Art. 2.', title: 'Suwerenność Narodu', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 102,
    text: 'Władza w Rzeczypospolitej pochodzi od Narodu i jest sprawowana wyłącznie w jego imieniu oraz na jego rzecz. Jakiekolwiek sprawowanie władzy bez mandatu Narodu lub wbrew jego interesom jest nielegalne.' },
  { id: '1-3', paragraphId: '1', paragraph: '§ 1', artNum: 'Art. 3.', title: 'Suwerenność Narodu', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 103,
    text: 'Naród sprawuje władzę bezpośrednio — przez referenda, inicjatywę ustawodawczą i weto obywatelskie — oraz pośrednio, przez demokratycznie wybranych przedstawicieli posiadających odrębny mandat społeczny.' },
  { id: '1-4', paragraphId: '1', paragraph: '§ 1', artNum: 'Art. 4.', title: 'Suwerenność Narodu', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 104,
    text: 'Żadna partia polityczna, organizacja, instytucja ani jednostka nie może rościć sobie prawa do sprawowania władzy suwerennej. Suwerenność Narodu jest niezbywalna i nie podlega delegacji.' },

  // § 2 CHARAKTER PAŃSTWA
  { id: '2-1', paragraphId: '2', paragraph: '§ 2', artNum: 'Art. 1.', title: 'Charakter Państwa — Narzędzie Narodu', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 201,
    text: 'Państwo polskie jest instytucją służebną — powołaną do życia przez Naród w celu zabezpieczenia praw, wolności i dobrostanu obywateli. Istnieje dla ludzi, nie ludzie dla państwa.' },
  { id: '2-2', paragraphId: '2', paragraph: '§ 2', artNum: 'Art. 2.', title: 'Charakter Państwa — Narzędzie Narodu', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 202,
    text: 'Organy państwowe nie posiadają władzy własnej. Wszelka władza jest im powierzona przez Naród na warunkach określonych w niniejszej Konstytucji i może być w każdym czasie odwołana lub ograniczona zgodnie z trybem tu wskazanym.' },
  { id: '2-3', paragraphId: '2', paragraph: '§ 2', artNum: 'Art. 3.', title: 'Charakter Państwa — Narzędzie Narodu', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 203,
    text: 'Rząd prawa, nie ludzi — wszystkie organy państwa, bez wyjątku, działają wyłącznie na podstawie i w granicach prawa. Żaden organ, żaden urzędnik, żaden piastun władzy nie stoi ponad prawem.' },
  { id: '2-4', paragraphId: '2', paragraph: '§ 2', artNum: 'Art. 4.', title: 'Charakter Państwa — Narzędzie Narodu', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 204,
    text: 'W razie sprzeczności pomiędzy interesem instytucji państwowej a dobrem Narodu, pierwszeństwo ma zawsze dobro Narodu.' },

  // § 3 GODNOŚĆ CZŁOWIEKA
  { id: '3-1', paragraphId: '3', paragraph: '§ 3', artNum: 'Art. 1.', title: 'Godność Człowieka — Fundament Nienaruszalny', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 301,
    text: 'Przyrodzona i niezbywalna godność człowieka jest nienaruszalna. Jej poszanowanie i ochrona jest obowiązkiem każdego organu władzy publicznej.' },
  { id: '3-2', paragraphId: '3', paragraph: '§ 3', artNum: 'Art. 2.', title: 'Godność Człowieka — Fundament Nienaruszalny', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 302,
    text: 'Prawa i wolności człowieka nie są nadawane przez państwo — są mu przyrodzone. Konstytucja je potwierdza i chroni. Państwo nie może ich odebrać ani zawiesić, chyba że w ściśle określonych przypadkach i wyłącznie na podstawie wyraźnego przepisu Konstytucji.' },
  { id: '3-3', paragraphId: '3', paragraph: '§ 3', artNum: 'Art. 3.', title: 'Godność Człowieka — Fundament Nienaruszalny', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 303,
    text: 'Zakaz tortur i nieludzkiego traktowania — nikt nie może być poddany torturom, okrutnemu, nieludzkiemu lub poniżającemu traktowaniu albo karaniu. Zakaz ten nie podlega żadnym wyjątkom i nie może być uchylony żadną ustawą ani decyzją organu władzy.' },

  // § 4 TRADYCJA CHRZEŚCIJAŃSKA
  { id: '4-1', paragraphId: '4', paragraph: '§ 4', artNum: 'Art. 1.', title: 'Tradycja Chrześcijańska jako Fundament Etyczny', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 401,
    text: 'Rzeczpospolita Polska czerpie z ponad tysiącletniej tradycji chrześcijańskiej i katolickiej Narodu Polskiego, która stanowi fundament etyczny systemu wartości państwa.' },
  { id: '4-2', paragraphId: '4', paragraph: '§ 4', artNum: 'Art. 2.', title: 'Tradycja Chrześcijańska jako Fundament Etyczny', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 402,
    text: 'Etyka chrześcijańska — oparta na godności człowieka, odpowiedzialności, solidarności i sprawiedliwości — wyznacza aksjologiczny fundament stanowienia i stosowania prawa.' },
  { id: '4-3', paragraphId: '4', paragraph: '§ 4', artNum: 'Art. 3.', title: 'Tradycja Chrześcijańska jako Fundament Etyczny', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 403,
    text: 'Rzeczpospolita szanuje wolność sumienia i wyznania wszystkich obywateli. Osoby innych wyznań oraz niewierzące mogą w pełni uczestniczyć w życiu publicznym i pełnić wszelkie funkcje państwowe, pod warunkiem poszanowania etycznych zasad, na których opiera się porządek konstytucyjny.' },
  { id: '4-4', paragraphId: '4', paragraph: '§ 4', artNum: 'Art. 4.', title: 'Tradycja Chrześcijańska jako Fundament Etyczny', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 404,
    text: 'Kościoły i związki wyznaniowe są niezależne od państwa, a państwo jest niezależne od Kościołów. Wzajemne relacje opierają się na zasadzie poszanowania autonomii i współdziałania dla dobra człowieka i Narodu.' },

  // § 5 RODZINA
  { id: '5-1', paragraphId: '5', paragraph: '§ 5', artNum: 'Art. 1.', title: 'Rodzina jako Podstawowa Komórka Społeczna', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 501,
    text: 'Rodzina — trwały związek kobiety i mężczyzny — jest podstawową i naturalną komórką społeczną oraz gwarantem ciągłości Narodu. Rodzina jest pod szczególną ochroną prawa i państwa.' },
  { id: '5-2', paragraphId: '5', paragraph: '§ 5', artNum: 'Art. 2.', title: 'Rodzina jako Podstawowa Komórka Społeczna', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 502,
    text: 'Macierzyństwo i ojcostwo są chronione przez państwo. Rodziny wielodzietne korzystają ze szczególnego wsparcia, którego formy określa ustawa.' },
  { id: '5-3', paragraphId: '5', paragraph: '§ 5', artNum: 'Art. 3.', title: 'Rodzina jako Podstawowa Komórka Społeczna', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 503,
    text: 'Państwo wspiera rodzinę, lecz jej nie zastępuje. Rodzice mają pierwszeństwo przed państwem w wychowaniu dzieci zgodnie z własnymi wartościami i przekonaniami, w granicach prawa.' },

  // § 6 POMOCNICZOŚĆ
  { id: '6-1', paragraphId: '6', paragraph: '§ 6', artNum: 'Art. 1.', title: 'Zasada Pomocniczości i Decentralizacji', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 601,
    text: 'Władza publiczna powinna być sprawowana na szczeblu możliwie najbliższym obywatelowi. Zadania, które mogą być realizowane na poziomie lokalnym lub regionalnym, nie są przekazywane organom centralnym.' },
  { id: '6-2', paragraphId: '6', paragraph: '§ 6', artNum: 'Art. 2.', title: 'Zasada Pomocniczości i Decentralizacji', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 602,
    text: 'Wspólnoty samorządowe — gminne, powiatowe i wojewódzkie — mają zagwarantowaną sferę autonomii chronioną przed ingerencją władzy centralnej.' },
  { id: '6-3', paragraphId: '6', paragraph: '§ 6', artNum: 'Art. 3.', title: 'Zasada Pomocniczości i Decentralizacji', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 603,
    text: 'Naród, rodzina i wspólnota lokalna są naturalnymi i pierwotnymi podmiotami życia społecznego. Państwo wspiera ich działanie, a nie zastępuje.' },

  // § 7 PAŃSTWO PRAWA
  { id: '7-1', paragraphId: '7', paragraph: '§ 7', artNum: 'Art. 1.', title: 'Rzeczpospolita jako Państwo Prawa', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 701,
    text: 'Rzeczpospolita Polska jest demokratycznym państwem prawnym. Konstytucja jest najwyższym prawem Rzeczypospolitej. Wszystkie ustawy, rozporządzenia, umowy międzynarodowe i działania organów władzy muszą być z nią zgodne i precyzyjnie określone — przepisy niejasne, wieloznaczne lub pozostawiające organom władzy dowolność interpretacji są niezgodne z Konstytucją.' },
  { id: '7-2', paragraphId: '7', paragraph: '§ 7', artNum: 'Art. 2.', title: 'Rzeczpospolita jako Państwo Prawa', chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 702,
    text: 'Rzeczpospolita jest państwem jednolitym i niepodzielnym. Jej integralność terytorialna podlega bezwzględnej ochronie.' },

  // § 8 PRAWO DO ŻYCIA
  { id: '8-1', paragraphId: '8', paragraph: '§ 8', artNum: 'Art. 1.', title: 'Prawo do Życia, Wolności i Bezpieczeństwa', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 801,
    text: 'Każdy człowiek ma przyrodzone prawo do życia. Nikt nie może być go pozbawiony arbitralnie.' },
  { id: '8-2', paragraphId: '8', paragraph: '§ 8', artNum: 'Art. 2.', title: 'Prawo do Życia, Wolności i Bezpieczeństwa', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 802,
    text: 'Każdy ma prawo do wolności i bezpieczeństwa osobistego. Nikt nie może być zatrzymany, aresztowany ani pozbawiony wolności inaczej niż na zasadach i w trybie ściśle określonych ustawą. Każde zatrzymanie podlega kontroli sądowej w ciągu 48 godzin. Areszt tymczasowy nie może przekroczyć 3 miesięcy bez przedłużenia przez sąd i nie może trwać łącznie dłużej niż 12 miesięcy.' },
  { id: '8-3', paragraphId: '8', paragraph: '§ 8', artNum: 'Art. 3.', title: 'Prawo do Życia, Wolności i Bezpieczeństwa', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 803,
    text: 'Zakazane są wszelkie formy tortur, okrutnego traktowania, kar cielesnych oraz poniżającego traktowania lub karania — bez żadnych wyjątków i w żadnych okolicznościach.' },
  { id: '8-4', paragraphId: '8', paragraph: '§ 8', artNum: 'Art. 4.', title: 'Prawo do Życia, Wolności i Bezpieczeństwa', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 804,
    text: 'Każdy pozbawiony wolności ma prawo do niezwłocznej — nie później niż w ciągu 3 godzin od zatrzymania — informacji o przyczynach zatrzymania, dostępu do obrońcy i powiadomienia osoby bliskiej.' },

  // § 9 PRAWO DO BRONI
  { id: '9-1', paragraphId: '9', paragraph: '§ 9', artNum: 'Art. 1.', title: 'Prawo do Posiadania Broni', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 901,
    text: 'Prawo obywatela do posiadania broni jest gwarantowane i nie może być naruszone. Prawo to służy obronie własnej, obronie rodziny oraz obronie wolności Narodu przed bezprawnym przejęciem władzy niezgodnym z niniejszą Konstytucją.' },
  { id: '9-2', paragraphId: '9', paragraph: '§ 9', artNum: 'Art. 2.', title: 'Prawo do Posiadania Broni', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 902,
    text: 'Uzbrojony obywatel jest ostatecznym gwarantem wolności Narodu. Gdy państwo przestaje być narzędziem Narodu i staje się jego ciemiężcą, prawo do broni stanowi ostatnią linię obrony suwerenności.' },
  { id: '9-3', paragraphId: '9', paragraph: '§ 9', artNum: 'Art. 3.', title: 'Prawo do Posiadania Broni', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 903,
    text: 'Warunki nabywania, rejestracji i szkolenia w zakresie posiadania broni określa ustawa. Ustawa nie może jednak faktycznie uniemożliwić obywatelowi realizacji tego prawa.' },

  // § 10 WOLNOŚĆ SŁOWA
  { id: '10-1', paragraphId: '10', paragraph: '§ 10', artNum: 'Art. 1.', title: 'Wolność Słowa, Prasy i Mediów', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1001,
    text: 'Wolność wyrażania poglądów oraz pozyskiwania i rozpowszechniania informacji jest gwarantowana. Cenzura prewencyjna jest bezwzględnie zakazana.' },
  { id: '10-2', paragraphId: '10', paragraph: '§ 10', artNum: 'Art. 2.', title: 'Wolność Słowa, Prasy i Mediów', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1002,
    text: 'Wolność prasy i innych środków masowego przekazu jest podstawą demokratycznej kontroli władzy. Pluralizm mediów jest chroniony przez prawo.' },
  { id: '10-3', paragraphId: '10', paragraph: '§ 10', artNum: 'Art. 3.', title: 'Wolność Słowa, Prasy i Mediów', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1003,
    text: 'Platformy cyfrowe, portale społecznościowe i inne media internetowe działające na terytorium Rzeczypospolitej są zobowiązane do stosowania polskich standardów wolności słowa. Nie mogą ograniczać, usuwać ani obniżać widoczności treści zgodnych z polskim prawem na podstawie własnych regulaminów, algorytmów lub decyzji podmiotów zagranicznych.' },
  { id: '10-4', paragraphId: '10', paragraph: '§ 10', artNum: 'Art. 4.', title: 'Wolność Słowa, Prasy i Mediów', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1004,
    text: 'Zagraniczny kapitał w mediach działających na terytorium Rzeczypospolitej podlega obowiązkowi koncesjonowania. Ustawa określa dopuszczalne progi udziału kapitału zagranicznego w podmiotach medialnych, chroniąc pluralizm i niezależność polskiej przestrzeni informacyjnej.' },
  { id: '10-5', paragraphId: '10', paragraph: '§ 10', artNum: 'Art. 5.', title: 'Wolność Słowa, Prasy i Mediów', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1005,
    text: 'Wolność słowa chroni także treści niepopularne, kontrowersyjne i krytyczne wobec władzy. Jedyne dopuszczalne ograniczenia to: bezpośrednie nawoływanie do przemocy wobec konkretnych osób, nawoływanie do ludobójstwa oraz świadome rozpowszechnianie fałszywych informacji w celu szkody konkretnej osobie. Każde ograniczenie wymaga wyroku sądu.' },
  { id: '10-6', paragraphId: '10', paragraph: '§ 10', artNum: 'Art. 6.', title: 'Wolność Słowa, Prasy i Mediów', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1006,
    text: 'Każdy ma prawo do pokojowego zgromadzania się oraz do zrzeszania się.' },

  // § 11 PRYWATNOŚĆ
  { id: '11-1', paragraphId: '11', paragraph: '§ 11', artNum: 'Art. 1.', title: 'Prawo do Prywatności i Ochrony Danych', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1101,
    text: 'Każdy ma prawo do poszanowania prywatności życia osobistego, rodzinnego i komunikacji. Wkroczenie w sferę prywatności przez organy państwa jest dopuszczalne wyłącznie na podstawie imiennego nakazu sądu, wydanego w oparciu o konkretne, udokumentowane podejrzenie popełnienia przestępstwa dotyczące wskazanej z imienia i nazwiska osoby.' },
  { id: '11-2', paragraphId: '11', paragraph: '§ 11', artNum: 'Art. 2.', title: 'Prawo do Prywatności i Ochrony Danych', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1102,
    text: 'Masowa inwigilacja obywateli — zbieranie, przetwarzanie lub analiza danych dotyczących nieoznaczonych z góry osób — jest bezwzględnie zakazana. Zakaz ten nie może być uchylony żadną ustawą ani decyzją organu władzy.' },
  { id: '11-3', paragraphId: '11', paragraph: '§ 11', artNum: 'Art. 3.', title: 'Prawo do Prywatności i Ochrony Danych', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1103,
    text: 'Tajemnica korespondencji i komunikacji jest chroniona. Jej naruszenie bez imiennego nakazu sądowego stanowi przestępstwo urzędnicze ścigane z urzędu.' },
  { id: '11-4', paragraphId: '11', paragraph: '§ 11', artNum: 'Art. 4.', title: 'Prawo do Prywatności i Ochrony Danych', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1104,
    text: 'Dane osobowe obywateli są chronione. Każdy ma prawo wiedzieć, jakie dane na jego temat przetwarza państwo, żądać ich sprostowania i usunięcia.' },

  // § 12 RÓWNOŚĆ
  { id: '12-1', paragraphId: '12', paragraph: '§ 12', artNum: 'Art. 1.', title: 'Równość wobec Prawa', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1201,
    text: 'Wszyscy są równi wobec prawa. Konstytucja nie tworzy żadnych kategorii, grup ani klas obywateli objętych szczególną ochroną lub szczególnymi ograniczeniami. Prawo stosuje się jednolicie do wszystkich.' },
  { id: '12-2', paragraphId: '12', paragraph: '§ 12', artNum: 'Art. 2.', title: 'Równość wobec Prawa', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1202,
    text: 'Nikt nie może być dyskryminowany przez organy władzy publicznej ze względu na płeć, wiek, rasę, narodowość, pochodzenie, religię lub jej brak, przekonania polityczne, orientację seksualną, niepełnosprawność ani status majątkowy.' },
  { id: '12-3', paragraphId: '12', paragraph: '§ 12', artNum: 'Art. 3.', title: 'Równość wobec Prawa', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1203,
    text: 'Równość wobec prawa oznacza równość wszystkich — bez wyróżnionych grup, bez podziałów, bez hierarchii obywateli. Państwo nie tworzy podziałów tam, gdzie ich nie ma.' },

  // § 13 RZETELNY PROCES
  { id: '13-1', paragraphId: '13', paragraph: '§ 13', artNum: 'Art. 1.', title: 'Prawo do Rzetelnego Procesu', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1301,
    text: 'Każdy ma prawo do sprawiedliwego i publicznego rozpatrzenia sprawy przez niezawisły i bezstronny sąd. Pierwsze posiedzenie sądu w sprawie karnej odbywa się nie później niż w ciągu 30 dni od wniesienia aktu oskarżenia. Wyrok w pierwszej instancji zapada nie później niż w ciągu 12 miesięcy od pierwszego posiedzenia. Przekroczenie tych terminów bez uzasadnionych przyczyn daje stronie prawo do odszkodowania od Skarbu Państwa.' },
  { id: '13-2', paragraphId: '13', paragraph: '§ 13', artNum: 'Art. 2.', title: 'Prawo do Rzetelnego Procesu', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1302,
    text: 'Każdy oskarżony jest niewinny dopóki wina nie zostanie udowodniona prawomocnym wyrokiem sądu. Ciężar dowodu spoczywa wyłącznie na oskarżeniu.' },
  { id: '13-3', paragraphId: '13', paragraph: '§ 13', artNum: 'Art. 3.', title: 'Prawo do Rzetelnego Procesu', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1303,
    text: 'Każdy ma prawo do obrońcy od pierwszej chwili zatrzymania. Osobom nieposiadającym środków finansowych zapewnia się obrońcę z urzędu na koszt państwa.' },
  { id: '13-4', paragraphId: '13', paragraph: '§ 13', artNum: 'Art. 4.', title: 'Prawo do Rzetelnego Procesu', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1304,
    text: 'Zakaz samooskarżania — nikt nie ma obowiązku zeznawać przeciwko sobie. Przyznanie się do winy uzyskane pod jakimkolwiek przymusem jest nieważne z mocy prawa i stanowi przestępstwo osoby, która je wymusiła.' },
  { id: '13-5', paragraphId: '13', paragraph: '§ 13', artNum: 'Art. 5.', title: 'Prawo do Rzetelnego Procesu', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1305,
    text: 'Zakaz podwójnego karania — nikt nie może być sądzony ani karany za ten sam czyn więcej niż jeden raz.' },
  { id: '13-6', paragraphId: '13', paragraph: '§ 13', artNum: 'Art. 6.', title: 'Prawo do Rzetelnego Procesu', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1306,
    text: 'Prawo karne nie działa wstecz. Nie można wymierzyć kary surowszej niż ta, która obowiązywała w chwili popełnienia czynu.' },
  { id: '13-7', paragraphId: '13', paragraph: '§ 13', artNum: 'Art. 7.', title: 'Prawo do Rzetelnego Procesu', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1307,
    text: 'Rozprawa sądowa jest jawna. Wyłączenie jawności wymaga uzasadnionego postanowienia sądu i jest dopuszczalne wyłącznie dla ochrony prywatności stron lub bezpieczeństwa państwa.' },

  // § 14 WOLNOŚĆ GOSPODARCZA
  { id: '14-1', paragraphId: '14', paragraph: '§ 14', artNum: 'Art. 1.', title: 'Równość Szans i Wolność Gospodarcza', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1401,
    text: 'Każdy ma prawo do swobodnego wyboru zawodu i miejsca pracy oraz do prowadzenia działalności gospodarczej. Wolność gospodarcza jest gwarantowana i może być ograniczona wyłącznie ustawą, gdy jest to niezbędne dla ochrony ważnego interesu publicznego.' },
  { id: '14-2', paragraphId: '14', paragraph: '§ 14', artNum: 'Art. 2.', title: 'Równość Szans i Wolność Gospodarcza', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1402,
    text: 'Państwo zapewnia równość szans — każdy obywatel ma prawo do dostępu do edukacji i ochrony zdrowia niezależnie od swojego statusu majątkowego. Dostęp ten nie może być wyłączony z powodu ubóstwa.' },
  { id: '14-3', paragraphId: '14', paragraph: '§ 14', artNum: 'Art. 3.', title: 'Równość Szans i Wolność Gospodarcza', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1403,
    text: 'System podatkowy nie może karać przedsiębiorczości, pracy i sukcesu. Podatki są ustanawiane wyłącznie ustawą, muszą być proporcjonalne i przewidywalne.' },
  { id: '14-4', paragraphId: '14', paragraph: '§ 14', artNum: 'Art. 4.', title: 'Równość Szans i Wolność Gospodarcza', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1404,
    text: 'Sieć bezpieczeństwa socjalnego — pomoc dla osób które znalazły się w trudnej sytuacji życiowej nie z własnej winy — jest obowiązkiem państwa. Jej zakres i formy określa ustawa. Pomoc ta jest adresowana do tych, którzy nie mogą, nie do tych, którzy nie chcą.' },
  { id: '14-5', paragraphId: '14', paragraph: '§ 14', artNum: 'Art. 5.', title: 'Równość Szans i Wolność Gospodarcza', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1405,
    text: 'Pracownicy mają prawo do zrzeszania się i prowadzenia zbiorowych negocjacji. Praca przymusowa jest zakazana.' },
  { id: '14-6', paragraphId: '14', paragraph: '§ 14', artNum: 'Art. 6.', title: 'Równość Szans i Wolność Gospodarcza', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1406,
    text: 'Każdy ma prawo do ochrony zdrowia. Państwo organizuje i finansuje ze środków publicznych podstawową opiekę zdrowotną dostępną dla każdego obywatela. Formy i zakres tej opieki określa ustawa.' },
  { id: '14-7', paragraphId: '14', paragraph: '§ 14', artNum: 'Art. 7.', title: 'Równość Szans i Wolność Gospodarcza', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1407,
    text: 'Organy i agendy państwowe nie mogą prowadzić działalności gospodarczej konkurującej z obywatelami i podmiotami prywatnymi. Wyjątkiem jest infrastruktura o charakterze naturalnego monopolu, której formy własności i zarządzania określa ustawa.' },
  { id: '14-8', paragraphId: '14', paragraph: '§ 14', artNum: 'Art. 8.', title: 'Równość Szans i Wolność Gospodarcza', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1408,
    text: 'W czasie stanu wojennego Prezydent może przejąć zarządzanie — nie własność — dowolnego podmiotu gospodarczego działającego na terytorium Rzeczypospolitej, za uprzednią zgodą Sejmu wyrażoną w ciągu 48 godzin. Przejęcie zarządzania kończy się automatycznie z chwilą ustania stanu wojennego. Odszkodowanie należy się wyłącznie w przypadku udowodnionej straty wartości lub utraty własności wskutek decyzji państwa.' },

  // § 15 ŚRODOWISKO
  { id: '15-1', paragraphId: '15', paragraph: '§ 15', artNum: 'Art. 1.', title: 'Prawo do Środowiska Naturalnego', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1501,
    text: 'Każdy ma prawo do życia w zdrowym środowisku naturalnym. Ochrona środowiska jest obowiązkiem organów władzy publicznej i każdego podmiotu gospodarczego działającego na terytorium Rzeczypospolitej.' },
  { id: '15-2', paragraphId: '15', paragraph: '§ 15', artNum: 'Art. 2.', title: 'Prawo do Środowiska Naturalnego', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1502,
    text: 'Zasoby naturalne Rzeczypospolitej — ziemia, wody, lasy i kopaliny — są dobrem Narodu. Ich eksploatacja musi służyć dobru wspólnemu i nie może narażać przyszłych pokoleń na trwałe szkody środowiskowe.' },

  // § 16 OGRANICZENIA PRAW
  { id: '16-1', paragraphId: '16', paragraph: '§ 16', artNum: 'Art. 1.', title: 'Ograniczenia Praw i Wolności', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1601,
    text: 'Prawa i wolności zawarte w niniejszym rozdziale mogą być ograniczone wyłącznie w drodze ustawy, która musi precyzyjnie określać zakres ograniczenia, jego cel oraz czas trwania. Przepisy ograniczające prawa nie mogą być niejasne ani wieloznaczne.' },
  { id: '16-2', paragraphId: '16', paragraph: '§ 16', artNum: 'Art. 2.', title: 'Ograniczenia Praw i Wolności', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1602,
    text: 'Każde ograniczenie musi być proporcjonalne do chronionego celu i stanowić środek najmniej uciążliwy dla obywatela spośród skutecznych. Sąd Konstytucyjny kontroluje proporcjonalność wszystkich ograniczeń.' },
  { id: '16-3', paragraphId: '16', paragraph: '§ 16', artNum: 'Art. 3.', title: 'Ograniczenia Praw i Wolności', chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 1603,
    text: 'Istota żadnego prawa i wolności nie może być naruszona. Zakaz tortur z § 8 art. 3 i domniemanie niewinności z § 13 art. 2 nie podlegają żadnym ograniczeniom w żadnych okolicznościach.' },

  // § 17 TRÓJPODZIAŁ
  { id: '17-1', paragraphId: '17', paragraph: '§ 17', artNum: 'Art. 1.', title: 'Zasada Trójpodziału, Odrębnych Mandatów i Wzajemnej Kontroli', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1701,
    text: 'Władza ustawodawcza, wykonawcza i sądownicza są od siebie oddzielone, wzajemnie się równoważą i każda z nich posiada odrębny mandat społeczny udzielony bezpośrednio przez Naród. Koncentracja więcej niż jednej spośród tych władz w jednym organie lub jednej osobie jest zakazana i nieważna z mocy prawa.' },
  { id: '17-2', paragraphId: '17', paragraph: '§ 17', artNum: 'Art. 2.', title: 'Zasada Trójpodziału, Odrębnych Mandatów i Wzajemnej Kontroli', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1702,
    text: 'Każda z władz działa wyłącznie w granicach kompetencji przyznanych jej niniejszą Konstytucją. Działanie poza tymi granicami jest bezprawne i nieważne.' },
  { id: '17-3', paragraphId: '17', paragraph: '§ 17', artNum: 'Art. 3.', title: 'Zasada Trójpodziału, Odrębnych Mandatów i Wzajemnej Kontroli', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1703,
    text: 'Naród kontroluje wszystkie władze bezpośrednio przez: wolne wybory każdej z władz, referendum, obywatelską inicjatywę ustawodawczą, obywatelskie weto ustawodawcze, prawo do informacji i prawo do skargi konstytucyjnej.' },

  // § 18 SEJM
  { id: '18-1', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 1.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1801,
    text: 'Władzę ustawodawczą sprawuje jednoizbowy Sejm złożony z 314 posłów — po jednym z każdego powiatu. Zasada ta zapewnia równą reprezentację terytorialną i zbliża władzę do obywatela.' },
  { id: '18-2', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 2.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1802,
    text: 'Posłowie są wybierani w powszechnych, równych, bezpośrednich wyborach, w głosowaniu tajnym, na pięcioletnią kadencję.' },
  { id: '18-3', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 3.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1803,
    text: 'Mandat posła jest wolny — poseł wykonuje go zgodnie z sumieniem i interesem Narodu. Dyscyplina partyjna nie może nakazywać głosowania wbrew Konstytucji.' },
  { id: '18-4', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 4.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1804,
    text: 'Sejm uchwala ustawy, zatwierdza budżet państwa i ratyfikuje umowy międzynarodowe. Sejm nie sprawuje kontroli nad władzą wykonawczą — każda z władz posiada odrębny mandat Narodu i odpowiada wyłącznie przed Narodem.' },
  { id: '18-5', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 5.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1805,
    text: 'Posiedzenia Sejmu są jawne. Utajnienie obrad jest dopuszczalne wyłącznie uchwałą Sejmu podjętą większością 2/3 głosów, gdy wymaga tego bezpieczeństwo państwa.' },
  { id: '18-6', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 6.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1806,
    text: 'Osoba pełniąca funkcję publiczną, która dopuściła się przestępstwa umyślnego, podlega karze w wymiarze dwukrotnie wyższym niż przewidziany w Kodeksie Karnym, jeżeli czyn ten wywołał skutki długotrwałe lub dotknął znaczną liczbę osób. Progi określa ustawa.' },
  { id: '18-7', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 7.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1807,
    text: 'Poseł korzysta z immunitetu w zakresie sprawowania mandatu. Immunitet nie chroni przed odpowiedzialnością za: nawoływanie do przemocy, nawoływanie do obalenia ustroju konstytucyjnego, przestępstwa pospolite niezwiązane z wykonywaniem mandatu oraz korupcję. Uchylenie immunitetu wymaga uchwały Sejmu podjętej bezwzględną większością głosów w głosowaniu jawnym i imiennym.' },
  { id: '18-8', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 8.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1808,
    text: 'Inicjatywy ustawodawcze obywateli mają pierwszeństwo w porządku obrad Sejmu. Zakazane jest wnoszenie projektów ustaw przygotowanych przez podmioty zewnętrzne — korporacje, organizacje lobbingowe, podmioty zagraniczne. Poseł lub Prezydent składający projekt potwierdza pod odpowiedzialnością karną, że jest jego rzeczywistym autorem.' },
  { id: '18-9', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 9.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1809,
    text: 'Obywatele w liczbie co najmniej 0,5% uprawnionych do głosowania mogą wnieść projekt ustawy z pierwszeństwem rozpatrzenia. Sejm ma obowiązek rozpatrzyć go w ciągu 6 miesięcy.' },
  { id: '18-10', paragraphId: '18', paragraph: '§ 18', artNum: 'Art. 10.', title: 'Władza Ustawodawcza — Sejm', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1810,
    text: 'Obywatelskie weto ustawodawcze — w ciągu 60 dni od ogłoszenia ustawy, co najmniej 1% uprawnionych do głosowania może złożyć wniosek o referendum uchylające tę ustawę. Złożenie wniosku zawiesza wejście ustawy w życie do czasu referendum.' },

  // § 19 PREZYDENT
  { id: '19-1', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 1.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1901,
    text: 'Władzę wykonawczą sprawuje Prezydent Rzeczypospolitej. Prezydent jest jednocześnie głową państwa i szefem rządu. Nie ma odrębnego stanowiska Prezesa Rady Ministrów.' },
  { id: '19-2', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 2.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1902,
    text: 'Prezydent jest wybierany w powszechnych, bezpośrednich wyborach, w głosowaniu tajnym, na pięcioletnią kadencję. Nie może sprawować urzędu przez więcej niż dwie kadencje.' },
  { id: '19-3', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 3.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1903,
    text: 'Prezydent samodzielnie powołuje i odwołuje ministrów, którzy są przed nim odpowiedzialni. Ministrowie kierują powierzonymi im działami administracji rządowej i wykonują politykę Prezydenta w granicach ustaw.' },
  { id: '19-4', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 4.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1904,
    text: 'Prezydent: wykonuje ustawy i kieruje ich wykonaniem, prowadzi politykę zagraniczną i jest zwierzchnikiem Sił Zbrojnych sprawując tę funkcję przez cywilną kontrolę wojska, ratyfikuje umowy międzynarodowe wymagające uprzedniej zgody Sejmu, wydaje rozporządzenia wykonawcze wyłącznie na podstawie wyraźnego upoważnienia ustawowego.' },
  { id: '19-5', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 5.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1905,
    text: 'Prawo weta ustawodawczego — Prezydent może w ciągu 21 dni od przekazania ustawy odmówić jej podpisania i skierować ją do ponownego rozpatrzenia przez Sejm. Sejm może odrzucić weto większością 3/5 ustawowej liczby posłów. Odrzucenie weta przez Sejm zobowiązuje Prezydenta do podpisania ustawy w ciągu 7 dni.' },
  { id: '19-6', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 6.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1906,
    text: 'Prezydent nie może samodzielnie rozwiązać Sejmu. Może złożyć wniosek o zarządzenie referendum w sprawie rozwiązania Sejmu. Decyzję podejmuje Naród.' },
  { id: '19-7', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 7.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1907,
    text: 'Ministrowie są zobowiązani do osobistego stawiennictwa na posiedzeniach Sejmu i odpowiadania na pytania posłów w ciągu 21 dni od złożenia interpelacji.' },
  { id: '19-8', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 8.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1908,
    text: 'Prezydent ponosi odpowiedzialność konstytucyjną przed Trybunałem Stanu za naruszenie Konstytucji lub ustaw. Wniosek o postawienie Prezydenta przed Trybunałem wymaga uchwały Sejmu podjętej większością 2/3 głosów przy obecności co najmniej 3/4 ustawowej liczby posłów.' },
  { id: '19-9', paragraphId: '19', paragraph: '§ 19', artNum: 'Art. 9.', title: 'Władza Wykonawcza — Prezydent Rzeczypospolitej', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 1909,
    text: 'Prezydent może zostać odwołany przez Naród w referendum odwoławczym. Referendum zarządza się na wniosek co najmniej 1% uprawnionych do głosowania lub na wniosek Sejmu podjęty bezwzględną większością głosów. Decyzja należy wyłącznie do Narodu.' },

  // § 20 SĄDOWNICTWO
  { id: '20-1', paragraphId: '20', paragraph: '§ 20', artNum: 'Art. 1.', title: 'Władza Sądownicza — Niezawisłe Sądy z Mandatem Narodu', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 2001,
    text: 'Wymiar sprawiedliwości sprawują niezawisłe sądy. Władza sądownicza jest odrębna od władzy ustawodawczej i wykonawczej i nie podlega ich kierownictwu ani ingerencji w żadnej formie.' },
  { id: '20-2', paragraphId: '20', paragraph: '§ 20', artNum: 'Art. 2.', title: 'Władza Sądownicza — Niezawisłe Sądy z Mandatem Narodu', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 2002,
    text: 'Sędziowie posiadają mandat społeczny udzielony bezpośrednio przez Naród. Są wyłaniani w trójstopniowym procesie: weryfikacja merytoryczna przez komisję środowiskową, jawne przesłuchania, bezpośrednie wybory powszechne.' },
  { id: '20-3', paragraphId: '20', paragraph: '§ 20', artNum: 'Art. 3.', title: 'Władza Sądownicza — Niezawisłe Sądy z Mandatem Narodu', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 2003,
    text: 'Sędzia sprawuje urząd przez jedną, nieodnawialną kadencję 10 lat. Nieodnawialność kadencji gwarantuje niezawisłość — sędzia nie zabiega o reelekcję i nie jest nikomu zobowiązany politycznie.' },
  { id: '20-4', paragraphId: '20', paragraph: '§ 20', artNum: 'Art. 4.', title: 'Władza Sądownicza — Niezawisłe Sądy z Mandatem Narodu', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 2004,
    text: 'Sędzia może być złożony z urzędu wyłącznie prawomocnym orzeczeniem Sądu Dyscyplinarnego złożonego z sędziów, za naruszenie prawa lub obowiązków sędziowskich.' },
  { id: '20-5', paragraphId: '20', paragraph: '§ 20', artNum: 'Art. 5.', title: 'Władza Sądownicza — Niezawisłe Sądy z Mandatem Narodu', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 2005,
    text: 'Każdy ma prawo do sądu. Prawo to nie może być wyłączone ani ograniczone żadną ustawą ani decyzją organu władzy.' },
  { id: '20-6', paragraphId: '20', paragraph: '§ 20', artNum: 'Art. 6.', title: 'Władza Sądownicza — Niezawisłe Sądy z Mandatem Narodu', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 2006,
    text: 'Sąd Konstytucyjny orzeka o zgodności ustaw z Konstytucją, rozstrzyga spory kompetencyjne między organami władzy i rozpatruje skargi konstytucyjne obywateli. Skarga jest rozpatrywana w ciągu 6 miesięcy od jej złożenia.' },
  { id: '20-7', paragraphId: '20', paragraph: '§ 20', artNum: 'Art. 7.', title: 'Władza Sądownicza — Niezawisłe Sądy z Mandatem Narodu', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 2007,
    text: 'Sąd Konstytucyjny składa się z 15 sędziów wyłanianych przez bezpośrednie wybory Narodu — na jedną, nieodnawialną 12-letnią kadencję. Wybory odbywają się w odstępach co 4 lata.' },
  { id: '20-8', paragraphId: '20', paragraph: '§ 20', artNum: 'Art. 8.', title: 'Władza Sądownicza — Niezawisłe Sądy z Mandatem Narodu', chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 2008,
    text: 'Orzeczenia Sądu Konstytucyjnego są ostateczne i powszechnie obowiązujące. Odmowa wykonania orzeczenia Sądu Konstytucyjnego przez jakikolwiek organ władzy jest przestępstwem ściganym z urzędu.' },

  // § 21 REFERENDUM
  { id: '21-1', paragraphId: '21', paragraph: '§ 21', artNum: 'Art. 1.', title: 'Referendum', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2101,
    text: 'Referendum ogólnopolskie zarządza się obowiązkowo na wniosek co najmniej 2,5% uprawnionych do głosowania. Wniosek obywatelski zobowiązuje do przeprowadzenia referendum w ciągu 90 dni. Sejm może zarządzić referendum uchwałą bezwzględną większością głosów.' },
  { id: '21-2', paragraphId: '21', paragraph: '§ 21', artNum: 'Art. 2.', title: 'Referendum', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2102,
    text: 'Referendum zwykłe jest wiążące przy frekwencji co najmniej 25% uprawnionych. Referendum ustrojowe — dotyczące zmian Konstytucji, przystąpienia do sojuszu wojskowego lub przeniesienia suwerenności — jest wiążące przy frekwencji co najmniej 40%. Wynik w obu przypadkach rozstrzyga bezwzględna większość głosujących.' },
  { id: '21-3', paragraphId: '21', paragraph: '§ 21', artNum: 'Art. 3.', title: 'Referendum', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2103,
    text: 'Obligatoryjnemu referendum ustrojowemu podlegają: zmiany Konstytucji w kwestiach określonych w § 30, przystąpienie do unii politycznej lub sojuszu wojskowego oraz przeniesienie jakiegokolwiek elementu suwerenności na organizację ponadnarodową.' },
  { id: '21-4', paragraphId: '21', paragraph: '§ 21', artNum: 'Art. 4.', title: 'Referendum', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2104,
    text: 'Przedmiotem referendum nie mogą być: prawa i wolności z Rozdziału II oraz indywidualna odpowiedzialność karna.' },

  // § 22 INICJATYWA I WETO
  { id: '22-1', paragraphId: '22', paragraph: '§ 22', artNum: 'Art. 1.', title: 'Obywatelska Inicjatywa i Weto Ustawodawcze', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2201,
    text: 'Co najmniej 0,5% uprawnionych do głosowania może wnieść do Sejmu projekt ustawy z pierwszeństwem rozpatrzenia. Sejm jest zobowiązany rozpatrzyć go w ciągu 6 miesięcy. Odrzucenie projektu obywatelskiego może być zaskarżone do referendum na wniosek co najmniej 1% uprawnionych.' },
  { id: '22-2', paragraphId: '22', paragraph: '§ 22', artNum: 'Art. 2.', title: 'Obywatelska Inicjatywa i Weto Ustawodawcze', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2202,
    text: 'Co najmniej 1% uprawnionych do głosowania może złożyć wniosek o referendum uchylające ustawę w ciągu 60 dni od jej ogłoszenia. Weto obywatelskie zawiesza wejście w życie ustawy do czasu przeprowadzenia referendum.' },
  { id: '22-3', paragraphId: '22', paragraph: '§ 22', artNum: 'Art. 3.', title: 'Obywatelska Inicjatywa i Weto Ustawodawcze', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2203,
    text: 'Co najmniej 5% uprawnionych do głosowania może zainicjować zmianę Konstytucji w trybie § 29.' },

  // § 23 INFORMACJA PUBLICZNA
  { id: '23-1', paragraphId: '23', paragraph: '§ 23', artNum: 'Art. 1.', title: 'Prawo do Informacji Publicznej', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2301,
    text: 'Każdy obywatel ma prawo dostępu do informacji o działalności organów władzy publicznej, wydatkowaniu środków publicznych, zawieranych umowach i podejmowanych decyzjach. Informacja jest udostępniana w ciągu 14 dni od złożenia wniosku.' },
  { id: '23-2', paragraphId: '23', paragraph: '§ 23', artNum: 'Art. 2.', title: 'Prawo do Informacji Publicznej', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2302,
    text: 'Odmowa udostępnienia informacji jest dopuszczalna wyłącznie gdy dotyczy tajemnicy państwowej zatwierdzonej przez niezależny sąd, danych osobowych osób trzecich lub trwającego postępowania karnego. Każda odmowa podlega zaskarżeniu do sądu administracyjnego w ciągu 30 dni.' },
  { id: '23-3', paragraphId: '23', paragraph: '§ 23', artNum: 'Art. 3.', title: 'Prawo do Informacji Publicznej', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2303,
    text: 'Organy władzy publicznej są zobowiązane do proaktywnego i bieżącego publikowania: budżetów i sprawozdań finansowych, treści wszelkich umów zawieranych ze środków publicznych, protokołów posiedzeń ciał kolegialnych oraz oświadczeń majątkowych wszystkich osób pełniących funkcje publiczne. Oświadczenia majątkowe są jawne i dostępne publicznie.' },

  // § 24 KONFLIKT INTERESÓW
  { id: '24-1', paragraphId: '24', paragraph: '§ 24', artNum: 'Art. 1.', title: 'Zakaz Konfliktu Interesów i Rejestr Lobbingu', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2401,
    text: 'Osoba pełniąca funkcję publiczną nie może w czasie sprawowania tej funkcji: prowadzić działalności gospodarczej korzystającej z zasobów publicznych, zasiadać w zarządach lub radach nadzorczych spółek prawa handlowego, świadczyć odpłatnych usług doradczych podmiotom prywatnym, pobierać wynagrodzenia od jakichkolwiek podmiotów innych niż Skarb Państwa.' },
  { id: '24-2', paragraphId: '24', paragraph: '§ 24', artNum: 'Art. 2.', title: 'Zakaz Konfliktu Interesów i Rejestr Lobbingu', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2402,
    text: 'Ministrowie nie mogą być jednocześnie posłami. Posłowie nie mogą pełnić funkcji w rządzie.' },
  { id: '24-3', paragraphId: '24', paragraph: '§ 24', artNum: 'Art. 3.', title: 'Zakaz Konfliktu Interesów i Rejestr Lobbingu', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2403,
    text: 'Zakaz nepotyzmu — osoby pełniące kierownicze funkcje publiczne nie mogą zatrudniać w podległych sobie instytucjach małżonków, krewnych i powinowatych do drugiego stopnia.' },
  { id: '24-4', paragraphId: '24', paragraph: '§ 24', artNum: 'Art. 4.', title: 'Zakaz Konfliktu Interesów i Rejestr Lobbingu', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2404,
    text: 'Każdy kontakt osoby pełniącej funkcję publiczną z podmiotami zewnętrznymi w sprawach dotyczących stanowienia lub wykonywania prawa podlega obowiązkowemu wpisowi do jawnego rejestru publicznego. Rejestr zawiera datę, strony spotkania i ogólny temat. Brak wpisu stanowi naruszenie Konstytucji i pociąga do odpowiedzialności karnej.' },
  { id: '24-5', paragraphId: '24', paragraph: '§ 24', artNum: 'Art. 5.', title: 'Zakaz Konfliktu Interesów i Rejestr Lobbingu', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2405,
    text: 'Naruszenie zakazów z niniejszego paragrafu skutkuje natychmiastową utratą mandatu lub funkcji z mocy prawa i pociąga do odpowiedzialności karnej ściganej z urzędu. Przedawnienie karalności tych czynów nie biegnie w czasie sprawowania funkcji publicznej.' },

  // § 25 SYGNALIŚCI
  { id: '25-1', paragraphId: '25', paragraph: '§ 25', artNum: 'Art. 1.', title: 'Ochrona Sygnalistów, Dziennikarzy i Prawo do Skargi', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2501,
    text: 'Osoba ujawniająca w dobrej wierze informacje o naruszeniu prawa przez organy władzy publicznej korzysta z pełnej ochrony prawnej. Represjonowanie sygnalistów przez organy państwowe stanowi przestępstwo ścigane z urzędu.' },
  { id: '25-2', paragraphId: '25', paragraph: '§ 25', artNum: 'Art. 2.', title: 'Ochrona Sygnalistów, Dziennikarzy i Prawo do Skargi', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2502,
    text: 'Dziennikarstwo służące informowaniu obywateli o działalności organów władzy publicznej jest działalnością szczególnie chronioną. Dziennikarz ujawniający informacje o naruszeniach prawa przez władzę korzysta z ochrony tożsamej z ochroną sygnalisty.' },
  { id: '25-3', paragraphId: '25', paragraph: '§ 25', artNum: 'Art. 3.', title: 'Ochrona Sygnalistów, Dziennikarzy i Prawo do Skargi', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2503,
    text: 'Tajemnica dziennikarska — ochrona tożsamości źródeł informacji — jest nienaruszalna i nie może być uchylona żadną decyzją organu władzy wykonawczej. Jej uchylenie wymaga wyłącznie wyroku niezawisłego sądu w sprawie o najcięższe przestępstwa.' },
  { id: '25-4', paragraphId: '25', paragraph: '§ 25', artNum: 'Art. 4.', title: 'Ochrona Sygnalistów, Dziennikarzy i Prawo do Skargi', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2504,
    text: 'Wolność dziennikarska oznacza prawo i obowiązek rzetelnego informowania suwerena o faktach. Nie oznacza prawa do narzucania ideologii ani kształtowania opinii publicznej w interesie podmiotów innych niż Naród.' },
  { id: '25-5', paragraphId: '25', paragraph: '§ 25', artNum: 'Art. 5.', title: 'Ochrona Sygnalistów, Dziennikarzy i Prawo do Skargi', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2505,
    text: 'Każdy obywatel ma prawo składać skargi i petycje do każdego organu władzy publicznej. Organ ma obowiązek rozpatrzyć skargę i udzielić merytorycznej odpowiedzi w ciągu 30 dni.' },
  { id: '25-6', paragraphId: '25', paragraph: '§ 25', artNum: 'Art. 6.', title: 'Ochrona Sygnalistów, Dziennikarzy i Prawo do Skargi', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2506,
    text: 'Rzecznik Praw Obywatelskich stoi na straży praw i wolności obywateli. Jest powoływany przez Sejm bezwzględną większością głosów na wniosek organizacji pozarządowych. Rzecznik jest niezależny od wszystkich organów władzy.' },
  { id: '25-7', paragraphId: '25', paragraph: '§ 25', artNum: 'Art. 7.', title: 'Ochrona Sygnalistów, Dziennikarzy i Prawo do Skargi', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2507,
    text: 'Każdy ma prawo do wniesienia skargi konstytucyjnej do Sądu Konstytucyjnego jeśli akt prawny lub działanie organu władzy narusza jego prawa konstytucyjne.' },

  // § 26 ODPOWIEDZIALNOŚĆ
  { id: '26-1', paragraphId: '26', paragraph: '§ 26', artNum: 'Art. 1.', title: 'Odpowiedzialność Karna Osób Sprawujących Władzę', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2601,
    text: 'Wszystkie osoby pełniące funkcje publiczne podlegają surowszej odpowiedzialności karnej niż zwykli obywatele, gdy popełnione przez nich przestępstwo miało długotrwałe skutki lub dotknęło znaczną liczbę osób. Progi określa ustawa.' },
  { id: '26-2', paragraphId: '26', paragraph: '§ 26', artNum: 'Art. 2.', title: 'Odpowiedzialność Karna Osób Sprawujących Władzę', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2602,
    text: 'Prezydent, ministrowie i sędziowie ponoszą odpowiedzialność konstytucyjną przed Trybunałem Stanu za naruszenie Konstytucji lub ustaw.' },
  { id: '26-3', paragraphId: '26', paragraph: '§ 26', artNum: 'Art. 3.', title: 'Odpowiedzialność Karna Osób Sprawujących Władzę', chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 2603,
    text: 'Przedawnienie karalności przestępstw popełnionych przez osoby piastujące władzę publiczną nie biegnie w czasie sprawowania przez nich urzędu.' },

  // § 27 LEGALNOŚĆ
  { id: '27-1', paragraphId: '27', paragraph: '§ 27', artNum: 'Art. 1.', title: 'Zasada Legalności i Precyzji Prawa', chapter: 'Rozdział V — Praworządność', stars: 5, order: 2701,
    text: 'Organy władzy publicznej działają wyłącznie na podstawie i w granicach prawa. Wszelkie działania organów państwa bez wyraźnej podstawy prawnej są nieważne.' },
  { id: '27-2', paragraphId: '27', paragraph: '§ 27', artNum: 'Art. 2.', title: 'Zasada Legalności i Precyzji Prawa', chapter: 'Rozdział V — Praworządność', stars: 5, order: 2702,
    text: 'Przepisy prawne muszą być jasne, jednoznaczne i dostępne. Prawo niejasne lub wieloznaczne jest niezgodne z Konstytucją. Żaden przepis nie może pozostawiać organom władzy swobody interpretacji prowadzącej do dowolności stosowania.' },
  { id: '27-3', paragraphId: '27', paragraph: '§ 27', artNum: 'Art. 3.', title: 'Zasada Legalności i Precyzji Prawa', chapter: 'Rozdział V — Praworządność', stars: 5, order: 2703,
    text: 'Zakaz retroaktywności — prawo nie działa wstecz. Prawa nabyte nie mogą być odbierane bez uzasadnienia ważnym interesem publicznym i bez odszkodowania.' },
  { id: '27-4', paragraphId: '27', paragraph: '§ 27', artNum: 'Art. 4.', title: 'Zasada Legalności i Precyzji Prawa', chapter: 'Rozdział V — Praworządność', stars: 5, order: 2704,
    text: 'Organy władzy publicznej są zobowiązane do przestrzegania zasady proporcjonalności — stosowane środki muszą być adekwatne do celu i możliwie najmniej uciążliwe dla obywateli.' },

  // § 28 DOSTĘP DO SĄDU
  { id: '28-1', paragraphId: '28', paragraph: '§ 28', artNum: 'Art. 1.', title: 'Dostęp do Wymiaru Sprawiedliwości', chapter: 'Rozdział V — Praworządność', stars: 5, order: 2801,
    text: 'Każdy ma prawo do sądu. Pierwsze posiedzenie w sprawach cywilnych odbywa się w ciągu 60 dni od złożenia pozwu. Wyrok w pierwszej instancji zapada w ciągu 18 miesięcy. Przekroczenie tych terminów daje stronie prawo do odszkodowania od Skarbu Państwa.' },
  { id: '28-2', paragraphId: '28', paragraph: '§ 28', artNum: 'Art. 2.', title: 'Dostęp do Wymiaru Sprawiedliwości', chapter: 'Rozdział V — Praworządność', stars: 5, order: 2802,
    text: 'Pomoc prawna dla osób nieposiadających środków finansowych jest gwarantowana ze środków publicznych na poziomie umożliwiającym skuteczną obronę swoich praw.' },

  // § 29 ZMIANA KONSTYTUCJI
  { id: '29-1', paragraphId: '29', paragraph: '§ 29', artNum: 'Art. 1.', title: 'Tryb Zmiany Konstytucji', chapter: 'Rozdział VI — Zmiana Konstytucji', stars: 5, order: 2901,
    text: 'Zmianę Konstytucji może zaproponować: co najmniej 1/5 ustawowej liczby posłów, Prezydent Rzeczypospolitej lub co najmniej 5% uprawnionych do głosowania.' },
  { id: '29-2', paragraphId: '29', paragraph: '§ 29', artNum: 'Art. 2.', title: 'Tryb Zmiany Konstytucji', chapter: 'Rozdział VI — Zmiana Konstytucji', stars: 5, order: 2902,
    text: 'Projekt zmiany Konstytucji wymaga uchwalenia przez Sejm większością co najmniej 2/3 głosów przy obecności co najmniej połowy ustawowej liczby posłów.' },
  { id: '29-3', paragraphId: '29', paragraph: '§ 29', artNum: 'Art. 3.', title: 'Tryb Zmiany Konstytucji', chapter: 'Rozdział VI — Zmiana Konstytucji', stars: 5, order: 2903,
    text: 'Po uchwaleniu przez Sejm każdy projekt zmiany Konstytucji jest obowiązkowo poddawany pod referendum ogólnopolskie. Zmiana wchodzi w życie jeśli zaaprobuje ją bezwzględna większość głosujących przy frekwencji co najmniej 40%.' },
  { id: '29-4', paragraphId: '29', paragraph: '§ 29', artNum: 'Art. 4.', title: 'Tryb Zmiany Konstytucji', chapter: 'Rozdział VI — Zmiana Konstytucji', stars: 5, order: 2904,
    text: 'Między uchwaleniem przez Sejm a przeprowadzeniem referendum musi upłynąć co najmniej 90 dni, aby Naród mógł zapoznać się z treścią proponowanej zmiany.' },

  // § 30 KLAUZULE NIEZMIENIALNOŚCI
  { id: '30-1', paragraphId: '30', paragraph: '§ 30', artNum: 'Art. 1.', title: 'Klauzule Niezmienialności — Jądro Konstytucji', chapter: 'Rozdział VI — Zmiana Konstytucji', stars: 5, order: 3001,
    text: 'Następujących postanowień Konstytucji nie można zmienić w żadnym trybie: suwerenność Narodu jako jedynego źródła władzy; przyrodzona godność człowieka i bezwzględny zakaz tortur; zasada trójpodziału władzy i odrębnych mandatów; niezawisłość sądów i prawo do sądu; wolne wybory wszystkich władz; prawo do referendum i weta obywatelskiego; prawo do posiadania broni jako gwarancja wolności Narodu.' },
  { id: '30-2', paragraphId: '30', paragraph: '§ 30', artNum: 'Art. 2.', title: 'Klauzule Niezmienialności — Jądro Konstytucji', chapter: 'Rozdział VI — Zmiana Konstytucji', stars: 5, order: 3002,
    text: 'Sąd Konstytucyjny odmawia stwierdzenia zgodności z Konstytucją każdej zmiany naruszającej nienaruszalne jądro Konstytucji, nawet jeśli została przyjęta większością wymaganą przez § 29.' },

  // § 31 OBOWIĄZYWANIE
  { id: '31-1', paragraphId: '31', paragraph: '§ 31', artNum: 'Art. 1.', title: 'Obowiązywanie i Pierwszeństwo Konstytucji', chapter: 'Rozdział VII — Postanowienia Końcowe', stars: 5, order: 3101,
    text: 'Konstytucja jest bezpośrednio stosowana przez wszystkie sądy i organy władzy. Sędzia który stwierdza sprzeczność ustawy z Konstytucją odmawia jej zastosowania i kieruje pytanie prawne do Sądu Konstytucyjnego.' },
  { id: '31-2', paragraphId: '31', paragraph: '§ 31', artNum: 'Art. 2.', title: 'Obowiązywanie i Pierwszeństwo Konstytucji', chapter: 'Rozdział VII — Postanowienia Końcowe', stars: 5, order: 3102,
    text: 'Wszystkie obowiązujące ustawy zachowują moc o ile nie są sprzeczne z Konstytucją. Niezgodności są usuwane: przepisy naruszające prawa obywatelskie — w ciągu 2 lat; całość porządku prawnego — w ciągu 5 lat. Sąd Konstytucyjny może przedłużyć termin pięcioletni o kolejne 2 lata.' },

  // § 32 RATYFIKACJA
  { id: '32-1', paragraphId: '32', paragraph: '§ 32', artNum: 'Art. 1.', title: 'Ratyfikacja przez Naród', chapter: 'Rozdział VII — Postanowienia Końcowe', stars: 5, order: 3201,
    text: 'Niniejsza Konstytucja wchodzi w życie po zatwierdzeniu jej przez Naród w ogólnopolskim referendum ratyfikacyjnym przy frekwencji co najmniej 40% uprawnionych i pozytywnym wyniku bezwzględnej większości głosujących.' },
  { id: '32-2', paragraphId: '32', paragraph: '§ 32', artNum: 'Art. 2.', title: 'Ratyfikacja przez Naród', chapter: 'Rozdział VII — Postanowienia Końcowe', stars: 5, order: 3202,
    text: 'Referendum ratyfikacyjne jest jedynym trybem przyjęcia niniejszej Konstytucji. Żaden organ władzy nie może wprowadzić Konstytucji w życie bez uprzedniej zgody Narodu wyrażonej w referendum.' },

  // § 33 ZOBOWIĄZANIE
  { id: '33-1', paragraphId: '33', paragraph: '§ 33', artNum: '', title: 'Zobowiązanie', chapter: 'Rozdział VII — Postanowienia Końcowe', stars: 5, order: 3301,
    text: 'Niniejsza Konstytucja jest zobowiązaniem — nie obietnicą.\n\nZobowiązaniem Narodu wobec siebie samego, wobec swoich dzieci i wnuków.\n\nZobowiązaniem władzy wobec Narodu — do służenia, nie panowania.\n\nJej przestrzeganie to nie obowiązek, lecz fundament wspólnoty, którą wybieramy.\n\n— Naród Polski' },
]

// Unikalne paragrafy (dla agregacji)
export const PARAGRAPHS = Array.from(
  new Map(ARTICLES.map(a => [a.paragraphId, {
    id: a.paragraphId,
    paragraph: a.paragraph,
    title: a.title,
    chapter: a.chapter,
    stars: a.stars,
    order: Math.floor(a.order / 100),
  }])).values()
)
