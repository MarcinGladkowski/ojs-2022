Strategy Pattern w praktyce
Jestem niemal pewien, że słowo "Interfejs" nie jest Ci obce. Jednak istnieje szansa na to, że jego definicja i praktyczne wykorzystanie nie są już takie oczywiste.

Interfejs to rodzaj połączenia umożliwiającego komunikację.

Istnieją różne rodzaje interfejsu ale zasadniczo ich zadaniem jest właśnie przekazanie informacji z jednego miejsca w drugie, przy okazji dokonując jakiegoś rodzaju modyfikacji aby jedna i druga strona była w stanie zrozumieć komunikat.

W naszym zadaniu interfejs udostępnia każdy plik: mailer, push-notification i sms-service. Tym interfejsem jest metoda sendMessage. To dzięki niej możemy łatwo przesłać powiadomienia w różnych formach. Co więcej możemy przygotować jeden kod odpowiedzialny za wygenerowanie komunikatu a potem wygodnie przesłać go z pomocą przygotowanych interfejsów. Taka strategia daje nam też możliwość dodawania kolejnych kanałów komunikacji bez konieczności znacznego modyfikowania głównego kodu naszej aplikacji.

No i dokładnie ten scenariusz to praktyczny przykład wykorzystania Strategy Pattern. Czyli wzorca polegającego na utworzeniu takiego samego interfejsu dla różnych algorytmów.

W tym przypadku interfejsem jest metoda sendMessage a algorytmy dotyczą sposobu przesłania sms, powiadomienia push czy wiadomości e-mail.

Innym przykładem wykorzystania Strategy Pattern w praktyce może być Passport.js, czyli tzw. middleware pozwalający na łatwe podłączenie różnych usług autoryzacyjnych z pomocą tego samego (lub podobnego) interfejsu.

Teraz jesteśmy w miejscu w którym jasne jest dlaczego kod aplikacji znajduje się w wielu plikach oraz dlaczego każdy z nich udostępnia nam ten sam interfejs.

Wystarczy to wykorzystać. Ale to również nie musi być oczywiste.

Zmiana kontekstu
Poza eksportowaniem oraz zaimportowaniem interfejsu musimy go wykorzystać w pliku index.js. Co więcej w opisie zadania wyraźnie zaznaczone jest aby dokonać zmian, wprowadzając możliwie jak najmniejszą liczbę modyfikacji.

Takie ograniczenie nie jest bezzasadne. Gdy pracujesz z rozbudowaną aplikacją, wprowadzanie zmian faktycznie zwiększa ryzyko wystąpienia błędów. Poza tym jeżeli nie ma potrzeby dodawania sobie pracy, to warto to wykorzystać.

Jeżeli spojrzysz na kod znajdujący się w pliku index.js, zobaczysz że funkcja send wykorzystuje swój kontekst (słowo kluczowe this) do wysłania wiadomości. Co więcej w takiej sytuacji zakłada, że w jej kontekście znajduje się metoda sendMessage i przy okazji, to właśnie z tego wynika nasz błąd.

Teoretycznie moglibyśmy nadpisać zawartość funkcji i sięgnąć bezpośrednio po zaimportowane metody. Jednak w przypadku bardziej rozbudowanej aplikacji, znacznie mądrzejsze będzie przekazanie jej odpowiedniego kontekstu.

A kontekst funkcji w JavaScript definiowany jest poprzez sposób jej wywołania a konkretnie:

czy zostało wykorzystane słowo kluczowe new
czy zostały wykorzystane metody call, apply lub bind
czy została wykonana jako metoda obiektu
czy została wywołana w globalnym zakresie (i trybie strict)
Spośród wszystkich powyższych opcji, najlepszym sposobem wysłania wiadomości wybranym kanałem, będzie wykorzystanie metody bind do utworzenia różnych "senderów", np:

Metoda bind oczekuje od nas przekazania obiektu, który stanie się kontekstem wywoływanej funkcji. Interfejs Mailer to funkcja, którą możemy wywołać jako konstruktor (z pomocą słowa kluczowego new) i otrzymać obiekt. PushNotification to klasa na podstawie której w ten sam sposób możemy utworzyć obiekt. Natomiast smsService to zwykły obiekt, który możemy przekazać bezpośrednio do metody bind.

W efekcie mamy trzy metody, które posiadają odpowiedni kontekst i tym samym pozwalają nam na komunikację wybranymi kanałami. I to jest właśnie rozwiązanie naszego zadania.

