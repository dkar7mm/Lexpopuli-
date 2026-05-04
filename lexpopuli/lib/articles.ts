export type Article = {
  id: string
  paragraph: string
  title: string
  text: string
  chapter: string
  stars: number
  order: number
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

export const ARTICLES: Article[] = [
  {
    id: 'p0', paragraph: 'Preambuła', title: 'Preambuła',
    text: 'My, Naród Polski — świadomi, że władza w Rzeczypospolitej pochodzi wyłącznie od Narodu i służy wyłącznie Narodowi; przekonani, że państwo jest dobrowolnym narzędziem stworzonym przez ludzi dla ludzi — nie instytucją nadrzędną wobec swoich twórców; pamiętając ofiary i walkę wszystkich pokoleń, które broniły wolności, godności i prawa do stanowienia o sobie; zakorzenieni w ponad tysiącletniej tradycji chrześcijańskiej i katolickiej, która ukształtowała tożsamość, kulturę i etykę Narodu Polskiego; dążąc do trwałego zabezpieczenia godności każdego człowieka, równości szans, wolności jednostki i dobrostanu przyszłych pokoleń — zawieramy niniejszy Kontrakt Społeczny, ustanawiając Konstytucję Rzeczypospolitej Polskiej jako najwyższe prawo Narodu i wiążące zobowiązanie wszystkich władz publicznych wobec obywateli.',
    chapter: 'Preambuła', stars: 5, order: 0,
  },
  {
    id: '1', paragraph: '§ 1', title: 'Suwerenność Narodu',
    text: 'Rzeczpospolita Polska jest dobrem wspólnym wszystkich obywateli. Naród Polski jest jedynym i niepodzielnym suwerenem — źródłem wszelkiej władzy publicznej. Władza pochodzi od Narodu i służy wyłącznie Narodowi. Naród sprawuje władzę bezpośrednio przez referenda, inicjatywę ustawodawczą i weto obywatelskie, oraz pośrednio przez demokratycznie wybranych przedstawicieli posiadających odrębny mandat społeczny. Żadna partia, organizacja ani instytucja nie może rościć sobie prawa do władzy suwerennej.',
    chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 1,
  },
  {
    id: '2', paragraph: '§ 2', title: 'Charakter Państwa — Narzędzie Narodu',
    text: 'Państwo polskie jest instytucją służebną — powołaną do życia przez Naród w celu zabezpieczenia praw, wolności i dobrostanu obywateli. Istnieje dla ludzi, nie ludzie dla państwa. Organy państwowe nie posiadają władzy własnej — tylko powierzoną przez Naród. W razie sprzeczności pomiędzy interesem instytucji państwowej a dobrem Narodu, pierwszeństwo ma zawsze dobro Narodu.',
    chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 2,
  },
  {
    id: '3', paragraph: '§ 3', title: 'Godność Człowieka — Fundament Nienaruszalny',
    text: 'Przyrodzona i niezbywalna godność człowieka jest nienaruszalna. Prawa i wolności człowieka nie są nadawane przez państwo — są mu przyrodzone. Konstytucja je potwierdza i chroni. Zakaz tortur i nieludzkiego traktowania jest absolutny — nie podlega żadnym wyjątkom i nie może być uchylony żadną ustawą ani decyzją organu władzy.',
    chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 3,
  },
  {
    id: '4', paragraph: '§ 4', title: 'Tradycja Chrześcijańska jako Fundament Etyczny',
    text: 'Rzeczpospolita Polska czerpie z ponad tysiącletniej tradycji chrześcijańskiej i katolickiej Narodu Polskiego, która stanowi fundament etyczny systemu wartości państwa. Etyka chrześcijańska — oparta na godności człowieka, odpowiedzialności, solidarności i sprawiedliwości — wyznacza aksjologiczny fundament stanowienia i stosowania prawa. Rzeczpospolita szanuje wolność sumienia i wyznania wszystkich obywateli. Kościół i państwo są wzajemnie niezależne, współdziałając dla dobra człowieka i Narodu.',
    chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 4,
  },
  {
    id: '5', paragraph: '§ 5', title: 'Rodzina jako Podstawowa Komórka Społeczna',
    text: 'Rodzina — trwały związek kobiety i mężczyzny — jest podstawową i naturalną komórką społeczną oraz gwarantem ciągłości Narodu. Rodzina jest pod szczególną ochroną prawa i państwa. Macierzyństwo i ojcostwo są chronione przez państwo. Rodzice mają pierwszeństwo przed państwem w wychowaniu dzieci zgodnie z własnymi wartościami i przekonaniami, w granicach prawa.',
    chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 5,
  },
  {
    id: '6', paragraph: '§ 6', title: 'Zasada Pomocniczości i Decentralizacji',
    text: 'Władza publiczna powinna być sprawowana na szczeblu możliwie najbliższym obywatelowi. Zadania, które mogą być realizowane lokalnie, nie są przekazywane organom centralnym. Samorządy mają zagwarantowaną sferę autonomii chronioną przed ingerencją władzy centralnej. Państwo wspiera rodzinę i wspólnotę lokalną — nie zastępuje ich.',
    chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 6,
  },
  {
    id: '7', paragraph: '§ 7', title: 'Rzeczpospolita jako Państwo Prawa',
    text: 'Konstytucja jest najwyższym prawem Rzeczypospolitej. Wszystkie akty prawne muszą być z nią zgodne i precyzyjnie określone — przepisy niejasne lub wieloznaczne są niezgodne z Konstytucją. Rzeczpospolita jest państwem jednolitym i niepodzielnym. Jej integralność terytorialna podlega bezwzględnej ochronie.',
    chapter: 'Rozdział I — Zasady Ustrojowe: Naród jako Suweren', stars: 5, order: 7,
  },
  {
    id: '8', paragraph: '§ 8', title: 'Prawo do Życia, Wolności i Bezpieczeństwa',
    text: 'Każdy człowiek ma przyrodzone prawo do życia. Każde zatrzymanie podlega kontroli sądowej w ciągu 48 godzin. Areszt tymczasowy nie może trwać łącznie dłużej niż 12 miesięcy. Zakaz tortur absolutny — bez wyjątków i w żadnych okolicznościach. W ciągu 3 godzin od zatrzymania: informacja o przyczynach, dostęp do obrońcy, powiadomienie osoby bliskiej.',
    chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 8,
  },
  {
    id: '9', paragraph: '§ 9', title: 'Prawo do Posiadania Broni',
    text: 'Prawo obywatela do posiadania broni jest gwarantowane i nie może być naruszone. Prawo to służy obronie własnej, obronie rodziny oraz obronie wolności Narodu przed bezprawnym przejęciem władzy niezgodnym z niniejszą Konstytucją. Uzbrojony obywatel jest ostatecznym gwarantem wolności Narodu. Warunki rejestracji i szkolenia określa ustawa — nie może ona jednak faktycznie uniemożliwić obywatelowi realizacji tego prawa.',
    chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 9,
  },
  {
    id: '10', paragraph: '§ 10', title: 'Wolność Słowa, Prasy i Mediów',
    text: 'Wolność wyrażania poglądów jest gwarantowana. Cenzura prewencyjna jest bezwzględnie zakazana. Platformy cyfrowe działające w Polsce stosują polskie standardy wolności słowa — nie mogą ograniczać treści zgodnych z polskim prawem według własnych regulaminów podmiotów zagranicznych. Zagraniczny kapitał medialny podlega koncesjonowaniu. Wolność słowa chroni treści niepopularne i krytyczne wobec władzy.',
    chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 10,
  },
  {
    id: '11', paragraph: '§ 11', title: 'Prawo do Prywatności i Ochrony Danych',
    text: 'Ingerencja państwa w prywatność tylko na podstawie imiennego nakazu sądu dotyczącego konkretnej osoby. Masowa inwigilacja obywateli jest bezwzględnie zakazana — żadna ustawa tego nie zmieni. Naruszenie tajemnicy komunikacji bez nakazu sądowego jest przestępstwem urzędniczym ściganym z urzędu.',
    chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 11,
  },
  {
    id: '12', paragraph: '§ 12', title: 'Równość wobec Prawa',
    text: 'Wszyscy są równi wobec prawa. Konstytucja nie tworzy żadnych kategorii ani grup objętych szczególną ochroną lub ograniczeniami. Prawo stosuje się jednolicie do wszystkich — bez wyróżnionych grup, bez podziałów, bez hierarchii obywateli. Państwo nie tworzy podziałów tam, gdzie ich nie ma.',
    chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 12,
  },
  {
    id: '13', paragraph: '§ 13', title: 'Prawo do Rzetelnego Procesu',
    text: 'Pierwsze posiedzenie sądu w sprawie karnej — max 30 dni od aktu oskarżenia. Wyrok I instancji — max 12 miesięcy. Przekroczenie terminów = odszkodowanie od Skarbu Państwa. Domniemanie niewinności — ciężar dowodu wyłącznie na oskarżeniu. Obrońca od pierwszej chwili zatrzymania. Zakaz samooskarżania. Zakaz podwójnego karania. Prawo nie działa wstecz.',
    chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 13,
  },
  {
    id: '14', paragraph: '§ 14', title: 'Równość Szans i Wolność Gospodarcza',
    text: 'Wolność gospodarcza gwarantowana. Państwo zapewnia dostęp do edukacji i zdrowia niezależnie od statusu majątkowego. System podatkowy nie karze przedsiębiorczości i sukcesu. Sieć bezpieczeństwa socjalnego dla tych którzy nie mogą — nie dla tych którzy nie chcą. Organy państwowe nie mogą prowadzić działalności gospodarczej konkurującej z obywatelami.',
    chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 14,
  },
  {
    id: '15', paragraph: '§ 15', title: 'Prawo do Środowiska Naturalnego',
    text: 'Każdy ma prawo do życia w zdrowym środowisku naturalnym. Zasoby naturalne Rzeczypospolitej — ziemia, wody, lasy i kopaliny — są dobrem Narodu. Ich eksploatacja musi służyć dobru wspólnemu i nie może narażać przyszłych pokoleń na trwałe szkody środowiskowe.',
    chapter: 'Rozdział II — Prawa i Wolności Obywatelskie', stars: 5, order: 15,
  },
  {
    id: '17', paragraph: '§ 17', title: 'Zasada Trójpodziału i Odrębnych Mandatów',
    text: 'Władza ustawodawcza, wykonawcza i sądownicza są od siebie oddzielone i każda posiada odrębny mandat społeczny udzielony bezpośrednio przez Naród. Koncentracja dwóch władz w jednym miejscu jest zakazana i nieważna. Naród kontroluje wszystkie trzy władze przez wybory, referendum, inicjatywę ustawodawczą, weto obywatelskie i skargę konstytucyjną.',
    chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 17,
  },
  {
    id: '18', paragraph: '§ 18', title: 'Władza Ustawodawcza — Sejm',
    text: 'Jednoizbowy Sejm złożony z 314 posłów — po jednym z każdego powiatu. Kadencja 5 lat. Mandat wolny — poseł służy Narodowi, nie partii. Zakaz wnoszenia ustaw przygotowanych przez podmioty zewnętrzne (korporacje, lobbyści). Inicjatywy obywatelskie mają pierwszeństwo w porządku obrad. Sejm nie odwołuje Prezydenta samodzielnie — może tylko wnioskować o referendum odwoławcze.',
    chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 18,
  },
  {
    id: '19', paragraph: '§ 19', title: 'Władza Wykonawcza — Prezydent',
    text: 'System prezydencki — Prezydent jest jednocześnie głową państwa i szefem rządu. Brak premiera. Wybory powszechne, bezpośrednie, kadencja 5 lat, max 2 kadencje. Sam powołuje i odwołuje ministrów. Weto ustawodawcze — Sejm obala większością 3/5. Prezydent nie rozwiązuje Sejmu samodzielnie — może wnioskować o referendum. Odwołanie Prezydenta tylko przez referendum Narodu.',
    chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 19,
  },
  {
    id: '20', paragraph: '§ 20', title: 'Władza Sądownicza — Sędziowie z Mandatem Narodu',
    text: 'Sędziowie wybierani przez Naród w wyborach powszechnych — po weryfikacji merytorycznej przez niezależną komisję i jawnych przesłuchaniach. Kadencja jednorazowa 10 lat — nieodnawialna gwarantuje niezawisłość. Sąd Konstytucyjny — 15 sędziów, kadencja 12 lat. Orzeczenia ostateczne i powszechnie obowiązujące — odmowa wykonania to przestępstwo.',
    chapter: 'Rozdział III — Ustrój Państwa: Trójpodział Władzy pod Kontrolą Narodu', stars: 5, order: 20,
  },
  {
    id: '21', paragraph: '§ 21', title: 'Referendum',
    text: 'Referendum obligatoryjne na wniosek 2,5% uprawnionych — w ciągu 90 dni. Referendum zwykłe wiążące przy frekwencji 25%. Referendum ustrojowe (Konstytucja, sojusze, suwerenność) — frekwencja 40%. Wynik: bezwzględna większość głosujących.',
    chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 21,
  },
  {
    id: '22', paragraph: '§ 22', title: 'Obywatelska Inicjatywa i Weto Ustawodawcze',
    text: '0,5% uprawnionych może wnieść projekt ustawy z pierwszeństwem rozpatrzenia. 1% może zawetować ustawę w ciągu 60 dni. 5% może zainicjować zmianę Konstytucji. Weto obywatelskie zawiesza wejście ustawy w życie do czasu referendum.',
    chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 22,
  },
  {
    id: '23', paragraph: '§ 23', title: 'Prawo do Informacji Publicznej',
    text: 'Każdy obywatel ma prawo dostępu do informacji o działalności władzy w ciągu 14 dni. Oświadczenia majątkowe wszystkich osób pełniących funkcje publiczne są jawne i dostępne publicznie. Odmowa udostępnienia informacji podlega zaskarżeniu do sądu w ciągu 30 dni.',
    chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 23,
  },
  {
    id: '24', paragraph: '§ 24', title: 'Zakaz Konfliktu Interesów i Rejestr Lobbingu',
    text: 'Osoba pełniąca funkcję publiczną nie może prowadzić działalności gospodarczej, zasiadać w zarządach spółek, świadczyć usług doradczych ani pobierać wynagrodzenia poza Skarbem Państwa. Każdy kontakt z lobbystami podlega obowiązkowemu wpisowi do jawnego rejestru. Naruszenie = utrata mandatu z mocy prawa + odpowiedzialność karna.',
    chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 24,
  },
  {
    id: '25', paragraph: '§ 25', title: 'Ochrona Sygnalistów i Dziennikarzy',
    text: 'Sygnalista ujawniający naruszenia prawa przez władzę korzysta z pełnej ochrony prawnej. Dziennikarz informujący o działalności władzy korzysta z tej samej ochrony. Tajemnica dziennikarska jest nienaruszalna. Wolność dziennikarska oznacza rzetelne informowanie suwerena o faktach — nie prawo do narzucania ideologii.',
    chapter: 'Rozdział IV — Kontrola Władzy przez Naród', stars: 5, order: 25,
  },
  {
    id: '27', paragraph: '§ 27', title: 'Zasada Legalności i Precyzji Prawa',
    text: 'Organy władzy działają wyłącznie na podstawie prawa. Przepisy muszą być jasne i jednoznaczne — niejasne są niezgodne z Konstytucją. Prawo nie działa wstecz. Zasada proporcjonalności — środki adekwatne do celu i możliwie najmniej uciążliwe dla obywateli.',
    chapter: 'Rozdział V — Praworządność', stars: 5, order: 27,
  },
  {
    id: '29', paragraph: '§ 29', title: 'Tryb Zmiany Konstytucji',
    text: 'Zmianę może zaproponować 1/5 posłów, Prezydent lub 5% uprawnionych. Uchwalenie przez Sejm 2/3 głosów. Następnie obowiązkowe referendum przy frekwencji 40%. Minimum 90 dni między uchwaleniem a referendum. Każda zmiana Konstytucji wymaga zgody Narodu w referendum.',
    chapter: 'Rozdział VI — Zmiana Konstytucji', stars: 5, order: 29,
  },
  {
    id: '30', paragraph: '§ 30', title: 'Klauzule Niezmienialności',
    text: 'Nie można zmienić nigdy: suwerenności Narodu, godności człowieka i zakazu tortur, trójpodziału władzy z odrębnymi mandatami, niezawisłości sądów, wolnych wyborów wszystkich władz, prawa do referendum i weta obywatelskiego, prawa do posiadania broni jako gwarancji wolności.',
    chapter: 'Rozdział VI — Zmiana Konstytucji', stars: 5, order: 30,
  },
  {
    id: '33', paragraph: '§ 33', title: 'Zobowiązanie',
    text: 'Niniejsza Konstytucja jest zobowiązaniem — nie obietnicą. Zobowiązaniem Narodu wobec siebie samego, wobec swoich dzieci i wnuków. Zobowiązaniem władzy wobec Narodu — do służenia, nie panowania. Jej przestrzeganie to nie obowiązek, lecz fundament wspólnoty, którą wybieramy. — Naród Polski',
    chapter: 'Rozdział VII — Postanowienia Końcowe', stars: 5, order: 33,
  },
]
