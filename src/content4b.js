Object.assign(X,{
u7:{gx:[
"g|Ieri ___ studiato due ore.|ho/sono/avevo|0|Studiare usa avere.",
"g|Hai ___ la lettera? (leggere)|letto/leggiuto/leggito|0|Leggere → letto.",
"g|Abbiamo ___ un buon vino. (bere)|bevuto/bevito/beuto|0|Bere → bevuto.",
"g|Ho ___ la finestra. (aprire)|aperto/aprito/apruto|0|Aprire → aperto.",
"g|Mi hanno ___ il prezzo. (dire)|detto/dito/diciuto|0|Dire → detto.",
"g|Hai ___ la porta? (chiudere)|chiuso/chiudito/chiudesto|0|Chiudere → chiuso.",
"g|Ho ___ le chiavi sul tavolo. (mettere)|messo/mettuto/metto|0|Mettere → messo.",
"g|Ha ___ un messaggio. (scrivere)|scritto/scrivato/scriso|0|Scrivere → scritto.",
"g|Abbiamo ___ tutto. (capire)|capito/capiuto/capisciuto|0|Capire → capito.",
"g|___ già mangiato? (tu)|Hai/Sei/Ha|0|Tu hai + participio.",
"g|Non ho ___ finito. (todavía no)|ancora/già/mai|0|«Todavía no» = non… ancora.",
"g|Stamattina ___ fatto la spesa.|ho/sono/avevo|0|Fare usa avere.",
"t|Escribí el participio de «prendere».|preso|Prendere → preso.",
"t|Escribí el participio de «vedere».|visto|Vedere → visto.",
"t|Escribí en italiano: «¿Qué hiciste ayer?» (tu)|Cosa hai fatto ieri?~Che hai fatto ieri?~Che cosa hai fatto ieri?|Fare → fatto.",
"e|Ieri io ho scrivuto una mail.|Ieri ho scritto una mail./Ieri ho scrivato una mail./Ieri sono scritto una mail.|0|Scrivere → scritto.",
"e|Ho leggiato il giornale.|Ho letto il giornale./Ho leggiuto il giornale./Sono letto il giornale.|0|Leggere → letto.",
"e|Già ho mangiato.|Ho già mangiato./Ho mangiato giàa./Già mangiato ho.|0|«Già» va entre el auxiliar y el participio."],
map:["Ieri|Ayer","Imprevisti|Imprevistos","Persone e messaggi|Personas y mensajes","Gite|Paseos","Cosa mi hanno detto|Lo que me dijeron"],
build:`ayer|ieri
ayer trabajé|ieri ho lavorato
ayer trabajé todo el día|ieri ho lavorato tutto il giorno
pero a la noche vi una película|ma la sera ho visto un film
Ayer trabajé todo el día, pero a la noche vi una película italiana.|Ieri ho lavorato tutto il giorno, ma la sera ho visto un film italiano.`,
st:[{t:"Il giorno al contrario|El día al revés",img:"Lauti desayunando a medianoche y cenando a las siete de la mañana.",
l:`Ieri Lauti ha fatto tutto al contrario.|Ayer Lauti hizo todo al revés.
Ha cenato alle sette di mattina e ha fatto colazione a mezzanotte.|Cenó a las siete de la mañana y desayunó a medianoche.
Ha lavorato di notte e ha dormito di giorno.|Trabajó de noche y durmió de día.
Ha scritto un'email al Comune... in dialetto calabrese!|¡Le escribió un mail a la municipalidad... en dialecto calabrés!
L'impiegato ha risposto: «Non ho capito niente, ma bravo!»|El empleado respondió: «No entendí nada, ¡pero bien!»
La sera ha visto un film italiano, ma dalla fine all'inizio.|A la noche vio una película italiana, pero del final al principio.
Oggi è stanchissimo, ma ha imparato tante parole nuove.|Hoy está cansadísimo, pero aprendió muchas palabras nuevas.`,
q:`A che ora ha cenato Lauti?|Alle sette di mattina.
Cosa ha scritto al Comune?|Un'email in dialetto calabrese.
Come ha visto il film?|Dalla fine all'inizio.`},
{t:"Le chiavi perse|Las llaves perdidas",img:"Un gato del pueblo con las llaves de Lauti colgadas del cuello como un collar.",
l:`Ieri sera Lauti ha perso le chiavi di casa.|Anoche Lauti perdió las llaves de su casa.
Ha cercato dappertutto: nello zaino, al bar, in piazza.|Buscó por todos lados: en la mochila, en el bar, en la plaza.
Ha chiesto aiuto a tutti, ma nessuno le ha viste.|Le pidió ayuda a todos, pero nadie las vio.
Alla fine ha telefonato alla signora Teresa.|Al final llamó por teléfono a la señora Teresa.
Lei ha detto: «Le ha prese il mio gatto: gli piacciono le cose che brillano».|Ella dijo: «Las agarró mi gato: le gustan las cosas que brillan».
Il gatto ha restituito le chiavi in cambio di un pezzo di formaggio.|El gato devolvió las llaves a cambio de un pedazo de queso.
Da quel giorno Lauti ha sempre un po' di formaggio in tasca.|Desde ese día Lauti tiene siempre un poco de queso en el bolsillo.`,
q:`Cosa ha perso Lauti?|Le chiavi di casa.
Chi ha preso le chiavi?|Il gatto della signora Teresa.
Cosa ha chiesto il gatto in cambio?|Un pezzo di formaggio.`}],
gc:[{t:"Com'è andata ieri?",who:"Giulia, tu amiga",me:"Vos",reg:"tu",turns:[
["Ciao Lauti! Cosa hai fatto ieri?","¡Hola Lauti! ¿Qué hiciste ayer?","ho+lavorato/studiato/fatto/visto/mangiato","Ieri ho lavorato tutto il giorno.","Ayer trabajé todo el día.","Usá «ho» + participio."],
["E la sera? Sei uscito?","¿Y a la noche? ¿Saliste?","ho visto/film/sono rimasto/no/si","No, ho visto un film a casa.","No, vi una película en casa.","Contá qué hiciste a la noche."],
["Che film hai visto?","¿Qué película viste?","commedia/film/italiano/ho visto","Una commedia italiana. Non ho capito tutto, ma ho riso tanto.","Una comedia italiana. No entendí todo, pero me reí mucho.","Describí la película."],
["Hai già mangiato la 'nduja?","¿Ya comiste 'nduja?","si/no+ho già/non ancora/ho mangiato","Sì, l'ho già mangiata: è piccantissima!","Sí, ya la comí: ¡es picantísima!","Usá «già» o «non ancora»."],
["E hai conosciuto qualcuno in paese?","¿Y conociste a alguien en el pueblo?","ho conosciuto/si/no","Sì, ho conosciuto il barista e una vicina simpatica.","Sí, conocí al barista y a una vecina simpática.","«Ho conosciuto…»."],
["Che bello! Allora ti trovi bene.","¡Qué lindo! Entonces estás a gusto.","si/molto/bene","Sì, mi trovo molto bene!","¡Sí, estoy muy a gusto!","Confirmá."]]},
{t:"Un giorno difficile",who:"Marco, un amigo",me:"Vos, que tuviste un mal día",reg:"tu",turns:[
["Oh, che faccia! Che è successo?","¡Uh, qué cara! ¿Qué pasó?","ho perso/giornata/brutta/problema","Ho avuto una giornata difficile.","Tuve un día difícil.","«Ho avuto…»."],
["Perché? Cosa è successo?","¿Por qué? ¿Qué pasó?","ho perso/treno/autobus/chiavi","Ho perso il treno delle otto.","Perdí el tren de las ocho.","Contá el problema con «ho perso»."],
["E poi come hai fatto?","¿Y después cómo hiciste?","ho preso/aspettato/autobus/taxi","Ho dovuto aspettare un'ora e ho preso il treno dopo.","Tuve que esperar una hora y tomé el tren siguiente.","«Ho dovuto…», «ho preso…»."],
["Almeno sei arrivato in tempo?","¿Al menos llegaste a tiempo?","no/si+ritardo/arrivato/tardi","No, ho fatto un'ora di ritardo.","No, llegué una hora tarde.","Respondé."],
["Dai, offro io un caffè.","Dale, invito yo un café.","grazie/volentieri/gentile","Grazie, sei gentilissimo!","¡Gracias, sos un amor!","Agradecé."]]}]},

u8:{gx:[
"g|Siamo ___ al mare domenica. (andare)|andati/andato/andate|0|Noi (grupo mixto o masculino): -i.",
"g|Giulia è ___ a Roma. (partire)|partita/partito/partiti|0|Ella: -a.",
"g|Mi sono ___ in centro. (perdere, yo)|perso/persa/perduto|0|Yo (hombre): perso.",
"g|Ieri sera ___ uscito con Marco.|sono/ho/sei|0|Uscire usa essere.",
"g|I tuoi amici sono ___? (venire)|venuti/venuto/venute|0|Masculino plural: -i.",
"g|Le ragazze si sono ___. (divertire)|divertite/divertiti/divertita|0|Femenino plural: -e.",
"g|Il film è ___ alle dieci. (finire)|finito/finita/finiti|0|Il film: masculino singular.",
"g|___ stato a Napoli? (tu)|Sei/Hai/È|0|Essere: sei stato.",
"g|Non ___ mai stato in Sicilia.|sono/ho/sei|0|Yo: sono stato.",
"g|Lauti è ___ in Italia a novembre. (arrivare)|arrivato/arrivata/arrivati|0|Él: -o.",
"g|Ho ___ il treno sbagliato. (prendere)|preso/presa/presi|0|Con avere no concuerda: preso.",
"g|Ci siamo ___ in piazza. (incontrare)|incontrati/incontrato/incontrate|0|Reflexivo, noi: -i.",
"t|Escribí en italiano: «Volvimos tarde».|Siamo tornati tardi|Tornare usa essere.",
"t|Escribí en italiano: «¿Te gustó?» (una película)|Ti è piaciuto?~Ti è piaciuto il film?|Piacere usa essere.",
"t|Escribí el participio de «nascere».|nato|Nascere → nato.",
"e|Ieri ho uscito con gli amici.|Ieri sono uscito con gli amici./Ieri ho uscita con gli amici./Ieri sono uscire con gli amici.|0|Uscire usa essere.",
"e|Le mie amiche sono arrivati.|Le mie amiche sono arrivate./Le mie amiche hanno arrivate./Le mie amiche sono arrivata.|0|Femenino plural: arrivate.",
"e|Mi ho svegliato tardi.|Mi sono svegliato tardi./Io ho svegliato tardi./Mi è svegliato tardi.|0|Reflexivos con essere."],
map:["Viaggi|Viajes","Uscite|Salidas","Cosa è successo|Qué pasó","Impressioni|Impresiones","Ospiti|Visitas"],
build:`fui|sono andato
fui a Scilla|sono andato a Scilla
fui a Scilla con unos amigos|sono andato a Scilla con degli amici
y nos divertimos muchísimo|e ci siamo divertiti tantissimo
El sábado fui a Scilla con unos amigos y nos divertimos muchísimo.|Sabato sono andato a Scilla con degli amici e ci siamo divertiti tantissimo.`,
st:[{t:"La gita a Scilla|La excursión a Scilla",img:"Un pez espada sacándose una selfie con Lauti en la playa de Scilla.",
l:`Domenica Lauti è andato a Scilla con Giulia e Marco.|El domingo Lauti fue a Scilla con Giulia y Marco.
Sono partiti presto, alle otto, e sono arrivati alle nove.|Salieron temprano, a las ocho, y llegaron a las nueve.
Sulla spiaggia hanno incontrato un pesce spada molto simpatico.|En la playa se encontraron con un pez espada muy simpático.
Il pesce spada ha voluto fare una foto con Lauti.|El pez espada quiso sacarse una foto con Lauti.
Poi sono andati a pranzo: hanno mangiato... il panino al tonno.|Después fueron a almorzar: comieron... sándwich de atún.
Il pesce spada si è offeso ed è tornato in mare.|El pez espada se ofendió y volvió al mar.
Sono tornati a casa tardi, stanchi ma felicissimi.|Volvieron a casa tarde, cansados pero felicísimos.`,
q:`Con chi è andato a Scilla Lauti?|Con Giulia e Marco.
Chi hanno incontrato in spiaggia?|Un pesce spada.
Perché il pesce spada si è offeso?|Perché hanno mangiato un panino al tonno.`},
{t:"Il treno sbagliato|El tren equivocado",img:"Lauti en un tren que en vez de ir a Reggio llega a la Luna.",
l:`Sabato Lauti è salito sul treno per Reggio.|El sábado Lauti se subió al tren a Reggio.
Si è addormentato subito.|Se quedó dormido enseguida.
Quando si è svegliato, il treno era... sulla Luna!|Cuando se despertó, el tren estaba... ¡en la Luna!
Il capotreno ha detto: «Scusi, è salito sul treno sbagliato».|El jefe de tren dijo: «Disculpe, se subió al tren equivocado».
Lauti è sceso, ha fatto due passi e ha preso un caffè con un astronauta.|Lauti se bajó, caminó un poco y tomó un café con un astronauta.
Poi è tornato sulla Terra con il treno delle sei.|Después volvió a la Tierra con el tren de las seis.
A casa nessuno gli ha creduto, ma lui ha la foto!|En casa nadie le creyó, ¡pero él tiene la foto!`,
q:`Dove voleva andare Lauti?|A Reggio.
Dove è arrivato il treno?|Sulla Luna.
Con chi ha preso un caffè?|Con un astronauta.`}],
gc:[{t:"Il fine settimana",who:"Giulia, tu amiga",me:"Vos",reg:"tu",turns:[
["Allora, dove sei andato nel fine settimana?","Bueno, ¿adónde fuiste el fin de semana?","sono andato/scilla/tropea/mare/reggio","Sono andato a Scilla.","Fui a Scilla.","«Sono andato a…»."],
["Che bello! Con chi?","¡Qué lindo! ¿Con quién?","con/amici/marco/ragazzi/solo","Con degli amici del paese.","Con unos amigos del pueblo.","«Con…»."],
["Come siete andati?","¿Cómo fueron?","treno/macchina/autobus/in","In treno.","En tren.","«In treno / in macchina»."],
["E cosa avete fatto?","¿Y qué hicieron?","siamo andati/abbiamo/mangiato/spiaggia/foto","Abbiamo mangiato il pesce e siamo andati in spiaggia.","Comimos pescado y fuimos a la playa.","Usá «abbiamo» y «siamo andati»."],
["A che ora siete tornati?","¿A qué hora volvieron?","siamo tornati/alle/tardi","Siamo tornati tardi, a mezzanotte.","Volvimos tarde, a medianoche.","«Siamo tornati…»."],
["E ti è piaciuto?","¿Y te gustó?","mi è piaciut/moltissimo/bellissim","Sì, mi è piaciuto moltissimo!","¡Sí, me gustó muchísimo!","«Mi è piaciuto»."]]},
{t:"Il viaggio in Italia",who:"Un pasajero mayor en el tren",me:"Vos",reg:"lei",turns:[
["Lei non è italiano, vero? Quando è arrivato?","Usted no es italiano, ¿no? ¿Cuándo llegó?","sono arrivato/novembre/tredici","Sono arrivato il tredici novembre.","Llegué el trece de noviembre.","«Sono arrivato…»."],
["E dove è arrivato? A Roma?","¿Y adónde llegó? ¿A Roma?","lamezia/sono arrivato/aeroporto/no","No, sono arrivato all'aeroporto di Lamezia.","No, llegué al aeropuerto de Lamezia.","Decí adónde llegaste."],
["È mai stato a Napoli?","¿Alguna vez estuvo en Nápoles?","no/si+mai stato/sono stato","No, non sono mai stato a Napoli.","No, nunca estuve en Nápoles.","«Non sono mai stato…»."],
["Deve andarci! E in Sicilia?","¡Tiene que ir! ¿Y a Sicilia?","no/non ancora/si","Non ancora, ma vorrei andarci.","Todavía no, pero quisiera ir.","Usá «non ancora»."],
["E cosa le è piaciuto di più della Calabria?","¿Y qué le gustó más de Calabria?","mi è piaciut/mare/gente/cibo","Mi è piaciuta molto la gente, e anche il mare.","Me gustó mucho la gente, y también el mar.","«Mi è piaciuto/a…»."]]}]},

u9:{gx:[
"g|___ sorella vive a Córdoba.|Mia/La mia/Mio|0|Familiar en singular: mia sorella.",
"g|___ cugini sono simpatici.|I miei/Miei/Le mie|0|Plural: i miei.",
"g|Com'è ___ casa?|la tua/tua/il tuo|0|Casa lleva artículo: la tua.",
"g|Ti ___ le canzoni italiane?|piacciono/piace/piaci|0|Plural: piacciono.",
"g|A noi ___ molto il mare.|piace/piacciono/piacciamo|0|Lo que gusta: il mare (singular).",
"g|___ manca l'Argentina? (a te)|Ti/Gli/Mi|0|A vos: ti.",
"g|A mio padre ___ piace il calcio.|gli/le/lo|0|A él: gli.",
"g|A mia madre ___ piacciono i fiori.|le/gli/la|0|A ella: le.",
"g|___ nonni erano italiani.|I miei/Miei/Mie|0|Plural: i miei.",
"g|Il ___ vicino ha un cane.|nostro/nostri/nostra|0|Vicino: masculino singular.",
"g|Questa è ___ moglie di Marco.|la/il/le|0|Con «di» lleva artículo: la moglie di Marco.",
"g|Ti è ___ la festa?|piaciuta/piaciuto/piaciute|0|La festa: femenino → piaciuta.",
"t|Escribí en italiano: «Extraño a mi familia».|Mi manca la mia famiglia|Mancare como piacere.",
"t|Escribí en italiano: «A ella le gusta bailar».|Le piace ballare~A lei piace ballare|A ella: le.",
"t|Escribí en italiano: «Mis amigos están en Córdoba».|I miei amici sono a Córdoba~I miei amici sono a Cordoba|Plural con artículo.",
"e|Mi piacciono il caffè.|Mi piace il caffè./Mi piaccio il caffè./Io piace il caffè.|0|Singular: piace.",
"e|Gli piace la pizza a Giulia.|A Giulia piace la pizza./Le piace a Giulia la pizza./Giulia piace la pizza.|0|A Giulia piace / le piace.",
"e|Mio fratelli vivono in Argentina.|I miei fratelli vivono in Argentina./Miei fratelli vivono in Argentina./Mio fratello vivono in Argentina.|0|Plural: i miei fratelli."],
map:["La famiglia|La familia","Gusti|Gustos","Cosa mi manca|Lo que extraño","Descrivere le persone|Describir a la gente","Rapporti|Relaciones"],
build:`me gusta|mi piace
me gusta mucho|mi piace molto
me gusta mucho la gente de acá|mi piace molto la gente di qui
pero extraño a mi familia|ma mi manca la mia famiglia
Me gusta mucho la gente de acá, pero extraño a mi familia.|Mi piace molto la gente di qui, ma mi manca la mia famiglia.`,
st:[{t:"Il pranzo della domenica|El almuerzo del domingo",img:"Una mesa larguísima con veinte primos, la abuela sirviendo pasta sin parar.",
l:`Domenica Lauti è a pranzo dalla famiglia di Giulia.|El domingo Lauti está almorzando con la familia de Giulia.
Ci sono la nonna, i genitori, gli zii e venti cugini.|Están la abuela, los padres, los tíos y veinte primos.
La nonna gli mette nel piatto pasta, carne, pesce e dolci.|La abuela le pone en el plato pasta, carne, pescado y postres.
Lauti dice: «Il pesce non mi piace molto...» Niente da fare: deve mangiare tutto!|Lauti dice: «El pescado no me gusta mucho...» No hay caso: ¡tiene que comer todo!
Dopo tre ore dice: «Basta, grazie, sono pienissimo!»|Después de tres horas dice: «¡Basta, gracias, estoy llenísimo!»
La nonna risponde: «Allora un caffè... e un altro cannolo».|La abuela responde: «Entonces un café... y otro cannolo».
La sera Lauti torna a casa rotolando, ma felice: adesso ha una nonna italiana.|A la noche Lauti vuelve a casa rodando, pero feliz: ahora tiene una abuela italiana.`,
q:`Dov'è Lauti domenica?|A pranzo dalla famiglia di Giulia.
Quanti cugini ci sono?|Venti.
Cosa offre la nonna alla fine?|Un caffè e un altro cannolo.`},
{t:"Il cane del vicino|El perro del vecino",img:"Un perro con anteojos leyendo el diario en el balcón.",
l:`Il vicino di Lauti ha un cane che si chiama Totò.|El vecino de Lauti tiene un perro que se llama Totò.
Totò è piccolo, bianco e molto intelligente.|Totò es chiquito, blanco y muy inteligente.
Ogni mattina legge il giornale sul balcone.|Todas las mañanas lee el diario en el balcón.
Gli piacciono le notizie di calcio, ma non gli piace la politica.|Le gustan las noticias de fútbol, pero no le gusta la política.
Un giorno Totò dice a Lauti: «Ti manca l'Argentina?»|Un día Totò le dice a Lauti: «¿Extrañás Argentina?»
«Un po'», risponde Lauti. «Mi mancano gli amici e l'asado».|«Un poco», responde Lauti. «Extraño a los amigos y el asado».
Il sabato dopo, Totò organizza un asado sul balcone per tutto il palazzo.|El sábado siguiente, Totò organiza un asado en el balcón para todo el edificio.`,
q:`Come si chiama il cane?|Totò.
Cosa non gli piace?|La politica.
Cosa manca a Lauti?|Gli amici e l'asado.`}],
gc:[{t:"La mia famiglia",who:"Giulia, tu amiga",me:"Vos",reg:"tu",turns:[
["Lauti, hai fratelli?","Lauti, ¿tenés hermanos?","ho/si+fratello/fabio","Sì, ho un fratello, Fabio.","Sí, tengo un hermano, Fabio.","«Ho un fratello…»."],
["E dov'è la tua famiglia?","¿Y dónde está tu familia?","la mia famiglia/argentina/cordoba","La mia famiglia è in Argentina, a Córdoba.","Mi familia está en Argentina, en Córdoba.","«La mia famiglia è…»."],
["Ti manca?","¿La extrañás?","mi manca/mi mancano/si/un po'","Sì, mi manca un po'.","Sí, la extraño un poco.","«Mi manca…»."],
["E cosa ti piace di più di qui?","¿Y qué es lo que más te gusta de acá?","mi piace/mi piacciono","Mi piace la gente, e mi piacciono i dolci calabresi.","Me gusta la gente, y me gustan los dulces calabreses.","Usá «mi piace» y «mi piacciono»."],
["E cosa non ti piace?","¿Y qué no te gusta?","non mi piace/non mi piacciono","Non mi piace il freddo in casa!","¡No me gusta el frío en casa!","«Non mi piace…»."],
["Domenica vieni a pranzo da noi? Mia nonna cucina benissimo.","¿El domingo venís a almorzar a casa? Mi abuela cocina buenísimo.","volentieri/si/certo/grazie","Volentieri, grazie! Cosa porto?","¡Con gusto, gracias! ¿Qué llevo?","Aceptá y ofrecé llevar algo."]]},
{t:"Descrivere una persona",who:"Un vecino que busca a alguien",me:"Vos",reg:"tu",turns:[
["Scusa, hai visto il mio amico Marco? Lo conosci?","Perdón, ¿viste a mi amigo Marco? ¿Lo conocés?","no/si+com'è/come","No, non lo conosco. Com'è?","No, no lo conozco. ¿Cómo es?","Pedí que lo describa."],
["È alto, moro, con la barba.","Es alto, morocho, con barba.","occhi/porta/vestito/quanti anni","Quanti anni ha?","¿Cuántos años tiene?","Preguntá algo más."],
["Più o meno trent'anni. Ha una giacca rossa.","Más o menos treinta años. Tiene una campera roja.","si/visto/bar/piazza","Sì, l'ho visto al bar della piazza.","Sí, lo vi en el bar de la plaza.","Decí dónde lo viste."],
["Grazie! Ah, e tu sei il ragazzo argentino?","¡Gracias! Ah, ¿y vos sos el chico argentino?","si/sono/lauti","Sì, sono Lauti. Piacere!","Sí, soy Lauti. ¡Mucho gusto!","Presentate."],
["Piacere! Ci vediamo in giro.","¡Un gusto! Nos vemos por ahí.","ciao/ci vediamo/a presto","Ciao, a presto!","¡Chau, hasta pronto!","Despedite."]]}]}
});
