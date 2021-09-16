# Praktikum - Sistemi ePoslovanja - 2020/2021

## Sadržaj spremišta

U ovom spremištu se nalazi projekat za predmet Praktikum - Sistemi ePoslovanja, na [UNIVERZITET SINGIDUNUM] u školskoj 2020/2021. godini.

## Struktura direktorijuma

* U direktorijumu [01-documentation](./01-documentation/README.md) se nalaze dokumenta u projektu, među kojima su tekst projektnog zahteva, projektna dokumentacija, model baze itd.
* U direktorijumu [02-resources](./02-resources/README.md) se nalaze prateći resursi za potrebe podizanja projekta, kao što je SQL dump sa demo podacima radne baze podataka, skripte za automatizaciju zadataka itd.
* U direktorijumu [03-back-end](./03-back-end/README.md) se nalazi Node.js projekat za back-end sloj aplikacije (API)
* U direktorijumu [04-front-end](./04-front-end/README.md) se nalazi React.js projekat za front-end aplikacije.

## Uputstvo za pokretanje aplikacije

Aplikacija se pokreće u tri koraka:

1. Mora da se pripremi MySQL/MariaDB baza podataka u koju se učitava ažurna verzija SQL dump-a baze (ne postoje migracije).
2. Zatim mora da se pokrene back-end sloj aplikacije (dalja uputstva su u direktorijumu back-end sloja).
3. Na kraju se pokreće front-end sloj aplikacije (dalja uputstva su u direktorijumu front-end sloja).
4. Otvara se veb adresa front-end-a aplikacije.