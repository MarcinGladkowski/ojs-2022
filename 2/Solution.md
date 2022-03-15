O co w tym chodzi?
Nasza gra nie działa i otrzymujemy błąd typu "LoadedGame.move is not a function". Jest to jeden z najczęściej występujących błędów w JavaScripcie i jedna z przyczyn powstania TypeScriptu. W praktyce oznacza, że próbujemy wykonać jako funkcję coś, co funkcją nie jest.

Jak być może wiesz, w JavaScripcie mamy różne typy danych. W zależności od tego z jakim rodzajem danych mamy do czynienia, możemy wykonywać (lub nie) na nich określone akcje. Np. w przypadku liczb możemy je dodawać a w przypadku ciągów znaków zamieniać małe litery na wielkie.

Wartości, które są funkcjami, możemy wywoływać dodając nawias, np. move(); Błąd "(...) is not a function" jest jasnym sygnałem, że nie mamy do czynienia z funkcją.

Ale skoro nie z funkcją, to z czym? No i na tym właśnie polega nasze zadanie.

To prototyp obiektu!
Jeżeli podejrzysz wartość zapisaną w zmiennej storedGame, zobaczysz że jest to obiekt zawierający dwie właściwości, przechowujący stan gry. W tej sytuacji to informacja o liczbie zwycięstw pierwszego i drugiego gracza.

Jednak gdy przez chwilę się nad tym zastanowisz, to coś jest tutaj mocno nie tak. Do metody "JSON.stringify()" nie przekazujemy obiekt game.

Jeżeli podejrzysz go sobie z pomocą console.log(), zobaczysz że jest to obiekt utworzony na podstawie klasy RockPaperScissors.

https://space.overment.com/Shared-Image-2022-03-12-19-23-29-Px7cH/Shared-Image-2022-03-12-19-23-29.png
No dobra! Metoda stringify zamienia obiekt w ciąg znaków. Później próbujemy "odwrócić" ten proces, wczytując stan gry z pomocą metody JSON.parse. Teoretycznie wszystko powinno być ok. W praktyce jednak, okazuje się, że obiekt który został przywrócony, tylko pozornie jest tym, za co go mamy. Spójrz:

https://space.overment.com/Shared-Image-2022-03-12-19-26-11-SIVZy/Shared-Image-2022-03-12-19-26-11.png
Jeden i drugi obiekt zawiera te same właściwości przechowujące stan gry. Ale w przypadku drugiego nie jest to już instancja klasy RockPaperScissors, tylko zwykły obiekt.

W JavaScripcie istnieją tzw. prototypy. Jest to specjalny mechanizm umożliwiający dziedziczenie właściwości pomiędzy obiektami. W naszym przypadku dziedziczoną właściwością jest metoda move(). Pochodzi ona z klasy RockPaperScissors i jest dostępna w obiektach, które są utworzone na jej podstawie. Dlatego obiekt game posiada metodę move. Natomiast podczas zapisywania stanu z pomocą JSON.stringify() zapisujemy obiekt bez jego prototypu. Po jego "przywróceniu" z pomocą JSON.parse otrzymujemy obiekt, który nie ma już połączenia z klasą i tym samym nie ma też dostępu do jej prototypu.

To prowadzi nas do sytuacji w której w obiekcie loadedGame właściwość move nie jest funkcją, lecz wartością undefined i z tego powodu przy próbie jej wywołania otrzymujemy błąd typu. W końcu próbujemy wywołać wartość, która nie jest funkcją.

Wszystko jasne! To teraz wystarczy to naprawić 🙃

Klasy w JavaScript
W tym miejscu nie ulega wątpliwości, że potrzebujesz gruntownej wiedzy na temat prototypów, obiektów oraz klas w JavaScripcie. Wszystko to znajdziesz w materiałach naszego Programu, do którego możesz dołączyć do 22:00 w piątek: Dołącz teraz.

Tymczasem na potrzeby rozwiązania zadania musisz wiedzieć, że metody zapisane bezpośrednio wewnątrz klasy, zostają przez JavaScript dopisane do prototypu każdego obiektu utworzonego na jej podstawie. Ważne: wyjątek stanowią metody, które wewnątrz constructora przypiszesz do właściwości this.

Jest to istotna informacja w kontekście naszego rozwiązania, ponieważ zależy nam na rozszerzeniu gry o możliwość zapisywania i wczytywania stanu. Inaczej mówiąc, nasze zadanie polega teraz na utworzeniu dwóch metod wewnątrz klasy RockPaperScissors. Dzięki temu na każdej instancji gry, zyskamy możliwość eksportowania ciągu zawierającego bieżący stan, oraz opcję jego wczytania w dowolnym momencie.

Zapisywanie stanu gry...
Zadaniem pierwszej metody jest zwrócenie obiektu zawierającego bieżący stan gry, w formie ciągu znaków.

W związku z tym że jest to metoda znajdująca się wewnątrz klasy, mamy możliwość odwołania się do bieżącego kontekstu poprzez słowo kluczowe this. To sprawia, że mamy dostęp do wyniku pierwszego i drugiego gracza.

Zatem wystarczy zbudować obiekt zawierający dwie właściwości, przypisać do niego wartości z wynikiem graczy i zwrócić jako ciąg znaków:

https://space.overment.com/Shared-Image-2022-03-12-20-56-31-o77gC/Shared-Image-2022-03-12-20-56-31.png
Rozwiązanie proste i jednocześnie skuteczne. Warto tylko zaznaczyć, że w ogóle doprowadzanie do sytuacji w której korzystamy ze słowa kluczowego this, jest przez wielu programistów unikane. Akurat w tym przypadku nie widzę z tym żadnego problemu, natomiast warto mieć to na uwadze. Jako powód podawany jest fakt, że wartość kontekstu faktycznie może łatwo ulec niechcianej zmianie i trudniej pracuje się z takim kodem. Trudno się tutaj nie zgodzić.

Ostatecznie nasze rozwiązanie działa i możemy zapisać stan gry w następujący sposób:

https://space.overment.com/Shared-Image-2022-03-12-21-03-00-qvhvN/Shared-Image-2022-03-12-21-03-00.png
...i wczytywanie
Teraz zostało nam wczytywanie stanu. Tutaj można podejść do tego na dwa sposoby:

albo dać możliwość wczytania stanu w momencie tworzenia gry
albo dać możliwość wczytania go po utworzeniu gry
Myślę że to który sposób jest lepszy jest trudne do określenia w przypadku naszego małego projektu. Nawet można powiedzieć, że nie robi to nam żadnej realnej różnicy. Nic też nie stoi na przeszkodzie aby zastosować jeden i drugi. Wtedy będziemy mieć możliwość zarówno przekazania stanu w chwili tworzenia gry, jak i wczytania go później.

Skupmy się jednak na drugim rozwiązaniu, czyli dodaniu metody umożliwiającej wczytanie wcześniej zapisanego stanu gry.

Tutaj sytuacja się trochę komplikuje, ponieważ być może przyjdzie Ci do głowy aby po prostu sparsować przekazany do niej ciąg znaków a następnie przypisać wyniki poszczególnych graczy.

Problem w tym, że jest to tzw. "Happy Path", czyli szczęśliwa ścieżka, zakładająca że wszystko pójdzie po Twojej myśli. W praktyce rzadko tak jest i jako programiści w tym aspekcie musimy być pesymistami. Założenie, że coś może pójść nie tak, jest tutaj akurat bardzo dobre.

Łatwo przewidzieć przynajmniej dwie sytuacje, które mogą pójść nie tak: albo przekazany ciąg znaków nie będzie zawierał poprawnego obiektu JSON albo przekazane właściwości nie będą posiadać odpowiednich wartości (np. nie będzie zgadzać się ich typ.

Dlatego musimy przechwycić błędy i potem odpowiednio je obsłużyć:

https://space.overment.com/Shared-Image-2022-03-12-22-04-30-KZoe1/Shared-Image-2022-03-12-22-04-30.png
Uwaga: powyższy przykład nie jest idealny, ponieważ w praktyce za bezpieczeństwo typów powinien odpowiadać TypeScript a sama walidacja powinna odbywać się z pomocą odpowiednich metod.

Ostatecznie jednak widzimy, że przy wczytywaniu danych pochodzących od użytkownika, za każdym razem powinniśmy zakładać, że nie będą takie jak tego oczekujemy i powinniśmy na to odpowiednio zareagować. Zawsze powinniśmy dążyć do tego, aby dostarczyć komplet niezbędnych informacji, które pozwolą rozwiązać problem.

Pamiętaj że fakt, że Twoja aplikacja zwraca błędy nie jest zły. Problem pojawia się wtedy gdy tego nie robi lub robi to w sposób, który nie mówi użytkownikowi co poszło nie tak.

Z tego powodu na etapie samego wczytywania stanu powinniśmy przechwycić wyjątek i wyświetlić go użytkownikowi. Teraz jednak nie będziemy tego robić, ponieważ nasza aplikacja nie posiada żadnego wizualnego interfejsu.

O co tak właściwie chodziło?
Doszliśmy do miejsca w którym nasza gra działa. Dla formalności dołączam jeszcze zrzut ekranu zawierający przykład zapisywania i wczytywania stanu:

https://space.overment.com/Shared-Image-2022-03-12-22-12-02-DfWJa/Shared-Image-2022-03-12-22-12-02.png
To zadanie jasno podkreśliło jak istotna jest wiedza na temat typów danych w JavaScript. Poza tym, pomimo tego że realnie nie używaliśmy słowa "prototype" w kodzie, to i tak boleśnie odczulibyśmy brak wiedzy na ich temat.

No i ostatecznie samo rozwiązanie problemu poprzez rozszerzenie prototypu gry, wymagało od nas wiedzy o tym jak w JavaScript funkcjonują klasy.

To wszystko stanowi doskonały przykład tego, jak w trakcie rozwoju aplikacji możesz spotkać się z problemami, które trudno rozwiązać posiadając pewne braki w wiedzy o JavaScripcie. Co gorsza takie braki mogą towarzyszyć nam przez wiele lat.