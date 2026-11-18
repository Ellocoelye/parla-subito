/* ===== Offline bank: everything the app can do without AI =====
   X[unitId] = {
     gx:   extra grammar items (same format as UNITS gx)
     map:  5 branch labels "it|es" for the unit map (branch i = chunks of day i+1)
     build: Michel-Thomas chain for the sprint: "es|it" lines, growing to a full sentence
     st:   2 stories {t:"title it|title es", img:"image es", l:"it|es" lines, q:"question|answer" lines}
     gc:   2 guided conversations {t, who (Spanish, who you talk to), me (your role), reg, turns:[[other_it, other_es, keys, model_it, model_es, hint_es]]}
           keys: groups separated by "+", alternatives by "/"; your answer must contain one alternative of every group.
   }                                                                                                   */
const X={
u1:{gx:[
"g|Lei ___ argentino?|è/ha/sta|0|Origen con essere: Lei è.",
"g|Loro ___ due figli.|hanno/sono/ha|0|Tener = avere: loro hanno.",
"g|Io e Fabio ___ fratelli.|siamo/abbiamo/sono|0|Io e Fabio = noi → siamo.",
"g|Tu ___ fame?|hai/sei/ha|0|El hambre va con avere: hai fame.",
"g|La stazione ___ lontana.|è/ha/sta|0|Describir dónde/cómo es algo: è.",
"g|___ studente è in ritardo.|Lo/Il/L'|0|Delante de s + consonante: lo.",
"g|___ zio di Marco abita qui.|Lo/Il/L'|0|Delante de z: lo zio.",
"g|Ho ___ amica a Reggio.|un'/un/una|0|Femenino que empieza con vocal: un'.",
"g|___ ufficio è chiuso.|L'/Il/Lo|0|Delante de vocal: l'.",
"g|Dove sono ___ chiavi?|le/i/gli|0|Femenino plural: le.",
"g|Sono qui ___ la cittadinanza.|per/da/a|0|«Por (motivo)» = per.",
"g|Abito a Varapodio ___ una settimana.|da/per/fa|0|«Desde hace» = da.",
"t|Escribí en italiano: «Tengo sueño».|Ho sonno|Sensaciones con avere.",
"t|Escribí en italiano: «Somos argentinos».|Siamo argentini|Noi siamo; adjetivo en plural.",
"t|Escribí en italiano: «¿Cuántos años tenés?»|Quanti anni hai?~Quanti anni hai|La edad con avere.",
"e|Io sono freddo.|Io ho freddo./Io sto freddo./Io è freddo.|0|El frío que sentís va con avere.",
"e|Lo amico di Lauti è qui.|L'amico di Lauti è qui./Il amico di Lauti è qui./La amico di Lauti è qui.|0|Delante de vocal: l'.",
"e|Sono qui da tre giorni fa.|Sono qui da tre giorni./Sono qui per tre giorni fa./Sono qui da fa tre giorni.|0|«Desde hace» = da, sin «fa»."],
map:["Chi sono|Quién soy","La mia storia|Mi historia","All'anagrafe|En el anagrafe","Documenti e domande|Documentos y preguntas","Come sto|Cómo estoy"],
build:`soy|sono
soy argentino|sono argentino
soy argentino, de Córdoba|sono argentino, di Córdoba
y estoy acá|e sono qui
y estoy acá por la ciudadanía|e sono qui per la cittadinanza
Soy argentino, de Córdoba, y estoy acá por la ciudadanía.|Sono argentino, di Córdoba, e sono qui per la cittadinanza.`,
st:[{t:"Il passaporto ballerino|El pasaporte bailarín",img:"Un pasaporte argentino bailando tango arriba del escritorio del anagrafe.",
l:`Lauti arriva all'anagrafe di Varapodio alle nove.|Lauti llega al anagrafe de Varapodio a las nueve.
Ha un appuntamento e ha tutti i documenti.|Tiene un turno y tiene todos los documentos.
L'impiegato dice: «Buongiorno, mi dica».|El empleado dice: «Buen día, dígame».
Lauti apre lo zaino, ma il passaporto salta fuori e balla il tango!|Lauti abre la mochila, ¡pero el pasaporte salta afuera y baila tango!
L'impiegato è stanco, ma ride: «È argentino anche il passaporto?»|El empleado está cansado, pero se ríe: «¿El pasaporte también es argentino?»
«Sì», dice Lauti, «e ha fame: sono le dieci e non ha fatto colazione».|«Sí», dice Lauti, «y tiene hambre: son las diez y no desayunó».
Alla fine il passaporto si ferma sul tavolo, e il timbro fa: TAC!|Al final el pasaporte se queda quieto sobre la mesa, y el sello hace: ¡TAC!`,
q:`A che ora arriva Lauti?|Alle nove.
Cosa fa il passaporto?|Balla il tango.
Com'è l'impiegato?|È stanco, ma ride.`},
{t:"La nonna detective|La abuela detective",img:"Una abuela calabresa con lupa investigando el apellido Tomassich en la plaza.",
l:`In piazza c'è una nonna con una lente d'ingrandimento.|En la plaza hay una abuela con una lupa.
Si chiama Rosa e ha novant'anni.|Se llama Rosa y tiene noventa años.
Vede Lauti e chiede: «Lei chi è? Non è di qui».|Ve a Lauti y pregunta: «¿Usted quién es? No es de acá».
«Mi chiamo Lauti, sono argentino. Il mio bisnonno era di Varapodio».|«Me llamo Lauti, soy argentino. Mi bisabuelo era de Varapodio».
Rosa guarda il suo cognome con la lente: «Tomassich... Due esse!»|Rosa mira su apellido con la lupa: «Tomassich... ¡Dos eses!»
«Il mio vicino ha un cugino con due esse», dice. «Forse siete parenti!»|«Mi vecino tiene un primo con dos eses», dice. «¡Quizás son parientes!»
Ora Lauti ha una nuova famiglia: tutto il paese.|Ahora Lauti tiene una familia nueva: todo el pueblo.`,
q:`Quanti anni ha Rosa?|Ha novant'anni.
Di dov'era il bisnonno di Lauti?|Era di Varapodio.
Cosa guarda Rosa con la lente?|Il cognome di Lauti.`}],
gc:[{t:"All'anagrafe",who:"Un empleado del anagrafe",me:"Vos, que venís a pedir la residencia",reg:"lei",turns:[
["Buongiorno! Mi dica, come posso aiutarla?","¡Buen día! Dígame, ¿en qué lo puedo ayudar?","appuntamento/residenza/vorrei/sono qui","Buongiorno, ho un appuntamento per la residenza.","Buen día, tengo un turno para la residencia.","Saludá y decí que tenés turno para la residencia."],
["Certo. Come si chiama?","Claro. ¿Cómo se llama?","chiamo/sono/nome","Mi chiamo Lautaro Tomassich.","Me llamo Lautaro Tomassich.","Decí tu nombre con «mi chiamo»."],
["Di dov'è, signor Tomassich?","¿De dónde es, señor Tomassich?","argentin/cordoba","Sono argentino, di Córdoba.","Soy argentino, de Córdoba.","Origen con «sono»."],
["Perché vuole la residenza qui a Varapodio?","¿Por qué quiere la residencia acá en Varapodio?","cittadinanza/bisnonno","Sono qui per la cittadinanza: il mio bisnonno era di Varapodio.","Estoy acá por la ciudadanía: mi bisabuelo era de Varapodio.","Contá el motivo: la ciudadanía y tu bisabuelo."],
["Ha il passaporto e il contratto d'affitto?","¿Tiene el pasaporte y el contrato de alquiler?","ecco/si+passaporto/document/contratto/tutto","Sì, ecco il passaporto e il contratto.","Sí, acá están el pasaporte y el contrato.","Respondé con «ecco»."],
["Perfetto. Tra qualche giorno passa il vigile per il controllo.","Perfecto. En unos días pasa el agente municipal para el control.","quanto tempo/quando/grazie/va bene","Va bene, grazie. Quanto tempo ci vuole?","Está bien, gracias. ¿Cuánto tiempo lleva?","Agradecé y preguntá cuánto tarda."]]},
{t:"Il nuovo vicino",who:"Una vecina mayor, curiosa",me:"Vos, el vecino nuevo",reg:"lei",turns:[
["Buongiorno! Lei è il nuovo vicino, vero?","¡Buen día! Usted es el vecino nuevo, ¿no?","si/sono+vicino/nuovo/arrivato/lauti","Sì, sono il nuovo vicino. Piacere, sono Lauti.","Sí, soy el vecino nuevo. Mucho gusto, soy Lauti.","Confirmá y presentate."],
["Piacere mio! E di dov'è?","¡El gusto es mío! ¿Y de dónde es?","argentin","Sono argentino, di Córdoba.","Soy argentino, de Córdoba.","Decí de dónde sos."],
["Argentino! E come mai a Varapodio?","¡Argentino! ¿Y cómo es que está en Varapodio?","bisnonno/cittadinanza","Il mio bisnonno era di qui: faccio la cittadinanza.","Mi bisabuelo era de acá: estoy haciendo la ciudadanía.","Contá lo de tu bisabuelo."],
["Che bello! Quanti anni ha?","¡Qué lindo! ¿Cuántos años tiene?","ho+anni","Ho trentadue anni.","Tengo treinta y dos años.","La edad va con «ho»."],
["E come si trova qui?","¿Y cómo se siente acá?","bene/piace/contento","Mi trovo bene, il paese mi piace molto.","Me siento bien, el pueblo me gusta mucho.","Decí que estás bien acá."],
["Se ha bisogno di qualcosa, io sono qui accanto.","Si necesita algo, yo estoy acá al lado.","grazie/gentile","Grazie mille, molto gentile!","¡Muchas gracias, muy amable!","Agradecé."]]}]},

u2:{gx:[
"g|Voi ___ il caffè al bar? (prendere)|prendete/prendiamo/prendono|0|Voi: -ete.",
"g|Lei ___ molto bene l'italiano. (parlare)|parla/parli/parlo|0|Lei (usted o ella): -a.",
"g|Io ___ alla cassa. (pagare)|pago/paga/paghi|0|Io: -o.",
"g|Noi ___ due pizze. (ordinare)|ordiniamo/ordinate/ordinano|0|Noi: -iamo.",
"g|Tu ___ sempre il cappuccino. (ordinare)|ordini/ordina/ordino|0|Tu: -i.",
"g|Loro ___ in centro. (mangiare)|mangiano/mangiamo/mangia|0|Loro: -ano.",
"g|Il conto ___ trenta euro.|è/sono/ha|0|Un precio en singular: è.",
"g|Quanto ___ i cornetti?|costano/costa/costi|0|Plural: costano.",
"g|___ due caffè, per favore.|Vorrei/Voglio di/Volere|0|Pedir con cortesía: vorrei.",
"g|Mi ___ un bicchiere d'acqua?|porta/porti/porto|0|Al mozo, con Lei: mi porta.",
"g|Senza ___ , per favore.|cipolla/la cipolla/di cipolla|0|«Sin cebolla»: senza cipolla.",
"g|Un caffè ___ banco, per favore.|al/a/in|0|Tomarlo parado en la barra: al banco.",
"t|Escribí el número 30 en letras.|trenta|30 = trenta.",
"t|Escribí el número 18 en letras.|diciotto|18 = diciotto.",
"t|Escribí en italiano: «La cuenta, por favor».|Il conto, per favore~Il conto per favore|Il conto.",
"e|Io pago con il carta.|Io pago con la carta./Io pago con lo carta./Io pago con il carto.|0|Carta es femenino: la carta.",
"e|Voglio un caffè (al mozo, con cortesía).|Vorrei un caffè./Volevo di un caffè./Vorrei di un caffè.|0|Con cortesía: vorrei.",
"e|Noi parliamo il italiano.|Noi parliamo l'italiano./Noi parliamo lo italiano./Noi parlo italiano.|0|Delante de vocal: l'italiano."],
map:["Al bar|En el bar","Pagare|Pagar","Al ristorante|En el restaurante","Ordinare|Pedir","Dopo cena|Después de comer"],
build:`quisiera|vorrei
quisiera un café|vorrei un caffè
quisiera un café y una medialuna|vorrei un caffè e un cornetto
quisiera un café y una medialuna con crema|vorrei un caffè e un cornetto alla crema
Quisiera un café y una medialuna con crema, por favor.|Vorrei un caffè e un cornetto alla crema, per favore.`,
st:[{t:"Il caffè che parla|El café que habla",img:"Una taza de espresso con bigote que le da consejos a Lauti en el bar.",
l:`Ogni mattina Lauti prende un caffè al bar della piazza.|Todas las mañanas Lauti toma un café en el bar de la plaza.
Oggi il caffè ha i baffi e parla!|¡Hoy el café tiene bigote y habla!
«Ciao Lauti! Perché bevi il caffè così veloce?»|«¡Hola Lauti! ¿Por qué tomás el café tan rápido?»
«Perché comincio a lavorare alle nove», risponde Lauti.|«Porque empiezo a trabajar a las nueve», responde Lauti.
«Qui in Calabria il caffè si beve con calma, e con un cornetto!»|«¡Acá en Calabria el café se toma con calma, y con una medialuna!»
Lauti ordina un cornetto alla crema e paga alla cassa.|Lauti pide una medialuna con crema y paga en la caja.
Il caffè è contento: «Bravo! Adesso sei un vero calabrese».|El café está contento: «¡Bien! Ahora sos un verdadero calabrés».`,
q:`Dove prende il caffè Lauti?|Al bar della piazza.
Cosa ha il caffè oggi?|Ha i baffi.
Cosa ordina Lauti alla fine?|Un cornetto alla crema.`},
{t:"La pasta piccante|La pasta picante",img:"Lauti escupiendo fuego como un dragón después de probar la 'nduja.",
l:`Lauti va a cena in una trattoria con un amico.|Lauti va a cenar a una trattoria con un amigo.
Il cameriere dice: «Oggi c'è la pasta con la 'nduja».|El mozo dice: «Hoy hay pasta con 'nduja».
«È piccante?», chiede Lauti.|«¿Es picante?», pregunta Lauti.
«No, solo un pochino», dice il cameriere, e sorride.|«No, solo un poquito», dice el mozo, y sonríe.
Lauti mangia e... fuoco! Come un drago!|Lauti come y... ¡fuego! ¡Como un dragón!
Beve tutta l'acqua del tavolo e anche quella dell'amico.|Se toma toda el agua de la mesa y también la del amigo.
Alla fine dice: «Era buonissima! Il conto, per favore... e altra acqua!»|Al final dice: «¡Estaba riquísima! La cuenta, por favor... ¡y más agua!»`,
q:`Cosa c'è oggi nella trattoria?|La pasta con la 'nduja.
Com'è la pasta?|È molto piccante.
Cosa chiede Lauti alla fine?|Il conto e altra acqua.`}],
gc:[{t:"Al bar della piazza",who:"La barista joven",me:"Vos, cliente",reg:"tu",turns:[
["Ciao! Cosa ti preparo?","¡Hola! ¿Qué te preparo?","vorrei/prendo/per me/un+caffè/cappuccino/cornetto","Vorrei un caffè e un cornetto, per favore.","Quisiera un café y una medialuna, por favor.","Pedí con «vorrei»."],
["Il cornetto vuoto o alla crema?","¿La medialuna sola o con crema?","crema/vuoto/cioccolato/marmellata","Alla crema, grazie.","Con crema, gracias.","Elegí: «alla crema» o «vuoto»."],
["Lo prendi qui o da portare via?","¿Lo tomás acá o para llevar?","qui/portare via","Qui, grazie.","Acá, gracias.","«Qui» o «da portare via»."],
["Ecco a te! Altro?","¡Acá tenés! ¿Algo más?","basta/niente/no grazie/quant","No, basta così. Quant'è?","No, nada más. ¿Cuánto es?","Decí que no y preguntá el precio."],
["Due euro e cinquanta.","Dos euros con cincuenta.","carta/contanti/pago/posso","Posso pagare con la carta?","¿Puedo pagar con tarjeta?","Preguntá si podés pagar con tarjeta."],
["Certo! Buona giornata!","¡Claro! ¡Buen día!","grazie/anche a te/altrettanto/buona","Grazie, anche a te!","¡Gracias, igualmente!","Agradecé y devolvé el saludo."]]},
{t:"Al ristorante",who:"El mozo de una trattoria",me:"Vos, que cenás con un amigo",reg:"tu",turns:[
["Ciao, buonasera! Avete prenotato?","¡Hola, buenas noches! ¿Reservaron?","no/si+prenotato/tavolo/due","No, avete un tavolo per due?","No, ¿tienen una mesa para dos?","Decí que no y pedí mesa para dos."],
["Sì, prego. Cosa vi porto da bere?","Sí, adelante. ¿Qué les traigo para tomar?","acqua/vino/birra","Un'acqua naturale e un bicchiere di vino rosso.","Un agua sin gas y una copa de vino tinto.","Pedí agua y vino."],
["Avete già scelto?","¿Ya eligieron?","consigli/prendo/vorrei/pasta","Cosa mi consigli?","¿Qué me recomendás?","Pedí una recomendación."],
["La pasta del giorno: con la 'nduja, un po' piccante.","La pasta del día: con 'nduja, un poco picante.","prendo/va bene/perfetto/vorrei","Perfetto, prendo la pasta del giorno.","Perfecto, pido la pasta del día.","Aceptá con «prendo»."],
["Tutto bene? Vi è piaciuto?","¿Todo bien? ¿Les gustó?","buonissim/buono/piaciuto","Sì, era buonissimo!","¡Sí, estaba riquísimo!","Decí que estaba riquísimo."],
["Vi porto qualcos'altro? Un dolce, un caffè?","¿Les traigo algo más? ¿Un postre, un café?","conto/basta/niente","No, grazie. Il conto, per favore.","No, gracias. La cuenta, por favor.","Pedí la cuenta."]]}]},

u3:{gx:[
"g|Io non ___ il latte. (trovare)|trovo/trova/trovi|0|Io: -o.",
"g|Tu ___ la verità? (sapere)|sai/sa/so|0|Sapere: tu sai.",
"g|Lui ___ le scarpe nere. (vendere)|vende/vendi/vendono|0|-ere, él: -e.",
"g|Noi ___ la porta. (aprire)|apriamo/aprite/aprono|0|Noi: -iamo.",
"g|Voi ___ alle otto? (chiudere)|chiudete/chiudiamo/chiudono|0|Voi: -ete.",
"g|Loro ___ bene l'italiano. (capire)|capiscono/capono/capiamo|0|Capire, ellos: capiscono.",
"g|Plural de «il pomodoro»:|i pomodori/le pomodore/gli pomodori|0|-o → -i, il → i.",
"g|Plural de «la mela»:|le mele/la mele/le meli|0|-a → -e, la → le.",
"g|Plural de «il cane»:|i cani/i cane/le cani|0|-e → -i.",
"g|Plural de «l'uovo»:|le uova/gli uovi/i uova|0|Irregular: l'uovo → le uova.",
"g|Plural de «la città»:|le città/le citte/la città|0|Con acento final no cambia.",
"g|Plural de «l'amica»:|le amiche/le amice/gli amiche|0|-ca → -che.",
"t|Escribí el plural: il negozio|i negozi|-o → -i.",
"t|Escribí el plural: la camicia|le camicie|-a → -e.",
"t|Escribí en italiano: «¿Me lo puedo probar?» (un vestido)|Posso provarlo?~Lo posso provare?|Probarse = provare.",
"e|Le pomodori sono freschi.|I pomodori sono freschi./Gli pomodori sono freschi./Le pomodore sono freschi.|0|Masculino plural: i.",
"e|Io preferisco il rosso, lui preferiscono il nero.|Io preferisco il rosso, lui preferisce il nero./Io preferisco il rosso, lui prefere il nero./Io preferisce il rosso, lui preferisco il nero.|0|Lui preferisce.",
"e|Vorrei due etti di il prosciutto.|Vorrei due etti di prosciutto./Vorrei due etti del il prosciutto./Vorrei due etti a prosciutto.|0|Cantidad + di, sin artículo."],
map:["Al negozio|En el negocio","Provare e scegliere|Probar y elegir","Al mercato|En el mercado","Cose che servono|Cosas que hacen falta","Pagare e salutare|Pagar y saludar"],
build:`busco|cerco
busco un par|cerco un paio
busco un par de zapatos|cerco un paio di scarpe
busco un par de zapatos negros|cerco un paio di scarpe nere
Busco un par de zapatos negros, número 43.|Cerco un paio di scarpe nere, numero quarantatré.`,
st:[{t:"Le scarpe magiche|Los zapatos mágicos",img:"Lauti con zapatos rojos que lo llevan bailando solo por toda Taurianova.",
l:`Lauti cerca un paio di scarpe a Taurianova.|Lauti busca un par de zapatos en Taurianova.
La commessa dice: «Ciao! Prova queste rosse, sono speciali».|La vendedora dice: «¡Hola! Probate estos rojos, son especiales».
Lauti le prova: sono comode, ma... cominciano a ballare!|Lauti se los prueba: son cómodos, pero... ¡empiezan a bailar!
Le scarpe escono dal negozio e portano Lauti in piazza, al mercato e in chiesa.|Los zapatos salen del negocio y llevan a Lauti a la plaza, al mercado y a la iglesia.
Tutti guardano: «Chi è quel ballerino?»|Todos miran: «¿Quién es ese bailarín?»
Dopo un'ora le scarpe tornano al negozio.|Después de una hora los zapatos vuelven al negocio.
Lauti dice: «Le prendo! Quanto vengono?» E la commessa: «Per te, sconto del dieci per cento».|Lauti dice: «¡Me los llevo! ¿Cuánto salen?» Y la vendedora: «Para vos, diez por ciento de descuento».`,
q:`Di che colore sono le scarpe?|Sono rosse.
Dove portano Lauti?|In piazza, al mercato e in chiesa.
Che sconto c'è?|Il dieci per cento.`},
{t:"Il pomodoro gigante|El tomate gigante",img:"Un tomate del tamaño de un auto en la verdulería del mercado.",
l:`Al mercato del sabato c'è un signore che vende frutta e verdura.|En el mercado del sábado hay un señor que vende frutas y verduras.
Lauti chiede: «Un chilo di pomodori, per favore».|Lauti pide: «Un kilo de tomates, por favor».
Il signore gli dà un pomodoro solo... ma è grande come una macchina!|El señor le da un solo tomate... ¡pero es grande como un auto!
«È un chilo?», chiede Lauti. «Più o meno», ride il signore.|«¿Es un kilo?», pregunta Lauti. «Más o menos», se ríe el señor.
Lauti lo porta a casa con l'aiuto di tre vicini.|Lauti lo lleva a casa con la ayuda de tres vecinos.
La sera fa la salsa per tutto il paese.|A la noche hace salsa para todo el pueblo.
E ora tutti lo chiamano «il signor Pomodoro».|Y ahora todos lo llaman «el señor Tomate».`,
q:`Cosa chiede Lauti?|Un chilo di pomodori.
Quanto è grande il pomodoro?|Come una macchina.
Come lo chiamano adesso?|Il signor Pomodoro.`}],
gc:[{t:"Scarpe nuove",who:"La vendedora joven de una zapatería",me:"Vos, cliente",reg:"tu",turns:[
["Ciao! Cerchi qualcosa?","¡Hola! ¿Buscás algo?","cerco/vorrei+scarpe/paio","Sì, cerco un paio di scarpe.","Sí, busco un par de zapatos.","Usá «cerco»."],
["Che numero porti?","¿Qué número calzás?","quarant/numero/porto/il","Porto il quarantatré.","Calzo el cuarenta y tres.","«Porto il…» + número."],
["Ecco, prova queste.","Acá tenés, probate estos.","stanno/strett/grand/comod/vanno","Mi stanno un po' strette. Avete il quarantaquattro?","Me quedan un poco ajustados. ¿Tienen el cuarenta y cuatro?","Decí cómo te quedan."],
["Sì. Le abbiamo in nero e in marrone.","Sí. Los tenemos en negro y en marrón.","preferisco/nere/nero/marrone/prendo","Preferisco quelle nere.","Prefiero los negros.","Usá «preferisco»."],
["Ottima scelta! Le prendi?","¡Muy buena elección! ¿Te los llevás?","quanto/vengono/costano/costa","Sì. Quanto vengono?","Sí. ¿Cuánto salen?","Preguntá el precio con «quanto vengono»."],
["Sessanta euro, con lo sconto cinquantaquattro.","Sesenta euros, con el descuento cincuenta y cuatro.","prendo/carta/perfett/va bene","Perfetto, le prendo. Posso pagare con la carta?","Perfecto, me los llevo. ¿Puedo pagar con tarjeta?","Aceptá y preguntá cómo pagar."]]},
{t:"Al mercato",who:"Un vendedor del mercado, gracioso",me:"Vos, que comprás verdura",reg:"tu",turns:[
["Ehi, giovane! Cosa ti do oggi?","¡Eh, joven! ¿Qué te doy hoy?","chilo/vorrei/mi dai/pomodori","Un chilo di pomodori, per favore.","Un kilo de tomates, por favor.","Pedí un kilo de algo."],
["Ecco qua. Ti servono anche le patate?","Acá tenés. ¿Necesitás también papas?","si/no+mezzo/chilo/grazie/basta","Sì, mezzo chilo, grazie.","Sí, medio kilo, gracias.","Respondé con una cantidad."],
["Assaggia questo formaggio: è nostro!","Probá este queso: ¡es nuestro!","buono/buonissim/quanto","È buonissimo! Quanto costa?","¡Está riquísimo! ¿Cuánto cuesta?","Opiná y preguntá el precio."],
["Quindici euro al chilo. Ne vuoi un po'?","Quince euros el kilo. ¿Querés un poco?","etti/etto/si/ne","Sì, due etti, per favore.","Sí, doscientos gramos, por favor.","Pedí «due etti»."],
["Altro?","¿Algo más?","basta/quant/niente","No, basta così. Quant'è in tutto?","No, nada más. ¿Cuánto es en total?","Cerrá la compra."],
["Sono dieci euro e cinquanta. Ti do una busta?","Son diez euros con cincuenta. ¿Te doy una bolsa?","si/no+grazie/busta","Sì, grazie. Ecco i soldi.","Sí, gracias. Acá está la plata.","Respondé y pagá."]]}]},

u4:{gx:[
"g|Vengo ___ Argentina.|dall'/dal/da la|0|da + l' = dall'.",
"g|Il bagno è ___ fondo.|in/al/nel|0|Expresión fija: in fondo.",
"g|Vado ___ farmacia.|in/a/nella|0|Con farmacia, banca, posta: in, sin artículo.",
"g|Vado ___ medico.|dal/al/in|0|A lo de una persona: da + il = dal.",
"g|Torno ___ casa.|a/alla/in la|0|«A casa», sin artículo.",
"g|Il treno parte ___ binario tre.|dal/del/al|0|Desde = da + il = dal.",
"g|Le chiavi sono ___ borsa.|nella/in la/nel|0|in + la = nella.",
"g|Il biglietto ___ treno costa poco.|del/di/dal|0|di + il = del.",
"g|Abito ___ Calabria.|in/a/nella|0|Con regiones: in.",
"g|___ molta gente alla stazione.|C'è/Ci sono/Sono|0|«Gente» es singular: c'è.",
"g|Quanto ci ___ per arrivare?|vuole/vogliono/vuoi|0|Ci vuole (singular) para el tiempo.",
"g|Ci ___ due ore.|vogliono/vuole/sono|0|Plural: ci vogliono.",
"t|Completá: «sobre la mesa» → ___ tavolo|sul|su + il = sul.",
"t|Completá: «en los negocios» → ___ negozi|nei|in + i = nei.",
"t|Escribí en italiano: «¿A qué hora sale el tren?»|A che ora parte il treno?~A che ora parte il treno|A che ora…?",
"e|Vado in la stazione.|Vado alla stazione./Vado nella stazione./Vado a stazione.|0|Ir a la estación: alla stazione.",
"e|Arrivo da il treno di Roma.|Arrivo con il treno da Roma./Arrivo dal treno da Roma./Arrivo da treno di Roma.|0|En tren = con il treno; desde = da.",
"e|Ci sono un bar qui vicino?|C'è un bar qui vicino?/Ci è un bar qui vicino?/C'è uno bar qui vicino?|0|Singular: c'è."],
map:["Il biglietto|El boleto","In stazione|En la estación","L'autobus|El colectivo","Dove si trova|Dónde queda","Problemi in viaggio|Problemas de viaje"],
build:`un boleto|un biglietto
un boleto a Reggio|un biglietto per Reggio
un boleto de ida y vuelta a Reggio|un biglietto di andata e ritorno per Reggio
quisiera un boleto de ida y vuelta a Reggio|vorrei un biglietto di andata e ritorno per Reggio
Quisiera un boleto de ida y vuelta a Reggio para el tren de las diez.|Vorrei un biglietto di andata e ritorno per Reggio per il treno delle dieci.`,
st:[{t:"Il treno che ha paura|El tren que tiene miedo",img:"Un tren regional temblando de miedo delante de un túnel.",
l:`Lauti prende il treno da Gioia Tauro a Reggio Calabria.|Lauti toma el tren de Gioia Tauro a Reggio Calabria.
Il treno parte dal binario due, alle dieci e un quarto.|El tren sale del andén dos, a las diez y cuarto.
Dopo dieci minuti si ferma davanti a una galleria.|Después de diez minutos se para delante de un túnel.
Il capotreno dice: «Scusate, il treno ha paura del buio».|El jefe de tren dice: «Disculpen, el tren tiene miedo de la oscuridad».
Tutti i passeggeri accendono la luce del telefono.|Todos los pasajeros prenden la luz del teléfono.
Il treno è contento e attraversa la galleria cantando.|El tren está contento y cruza el túnel cantando.
Arriva a Reggio con mezz'ora di ritardo, ma nessuno si lamenta.|Llega a Reggio con media hora de retraso, pero nadie se queja.`,
q:`Da quale binario parte il treno?|Dal binario due.
Di cosa ha paura il treno?|Del buio.
Con quanto ritardo arriva?|Con mezz'ora di ritardo.`},
{t:"La fermata sbagliata|La parada equivocada",img:"Lauti solo en una parada en el medio de un campo de olivos, con una cabra.",
l:`Lauti aspetta l'autobus per Gioia Tauro davanti alla chiesa.|Lauti espera el colectivo a Gioia Tauro frente a la iglesia.
Sale e chiede all'autista: «Mi dice quando devo scendere?»|Sube y le pide al chofer: «¿Me avisa cuándo me tengo que bajar?»
L'autista risponde: «Certo!» e poi... si dimentica.|El chofer responde: «¡Claro!» y después... se olvida.
Lauti scende in mezzo agli ulivi. Non c'è nessuno, solo una capra.|Lauti se baja en el medio de los olivos. No hay nadie, solo una cabra.
«Scusi, sa dov'è Gioia Tauro?», chiede Lauti alla capra.|«Disculpe, ¿sabe dónde queda Gioia Tauro?», le pregunta Lauti a la cabra.
La capra non risponde, ma cammina verso la strada.|La cabra no contesta, pero camina hacia la ruta.
Dopo un'ora arriva un altro autobus: la capra sale per prima!|Después de una hora llega otro colectivo: ¡la cabra sube primero!`,
q:`Dove aspetta l'autobus Lauti?|Davanti alla chiesa.
Cosa fa l'autista?|Si dimentica di avvisarlo.
Chi sale per primo sull'autobus?|La capra.`}],
gc:[{t:"In biglietteria",who:"Un empleado joven de la estación",me:"Vos, que viajás a Reggio",reg:"tu",turns:[
["Ciao! Dove devi andare?","¡Hola! ¿Adónde tenés que ir?","reggio/biglietto/per","Un biglietto per Reggio Calabria, per favore.","Un boleto a Reggio Calabria, por favor.","Pedí un boleto «per» + ciudad."],
["Solo andata o andata e ritorno?","¿Solo ida o ida y vuelta?","andata e ritorno/solo andata","Andata e ritorno.","Ida y vuelta.","Elegí una opción."],
["Va bene. Sono undici euro e quaranta.","Está bien. Son once euros con cuarenta.","a che ora/quando+parte/treno","A che ora parte il prossimo treno?","¿A qué hora sale el próximo tren?","Preguntá el horario."],
["Alle dieci e un quarto, dal binario due.","A las diez y cuarto, del andén dos.","cambiare/diretto/devo","Devo cambiare?","¿Tengo que hacer transbordo?","Preguntá si hay transbordo."],
["No, è diretto. Ricordati di convalidare il biglietto.","No, es directo. Acordate de validar el boleto.","dove/binario/macchinetta/convalid","Dove si convalida?","¿Dónde se valida?","Preguntá dónde se valida."],
["C'è una macchinetta gialla vicino al binario.","Hay una maquinita amarilla cerca del andén.","grazie","Perfetto, grazie mille!","¡Perfecto, muchas gracias!","Agradecé."]]},
{t:"Sull'autobus",who:"Un chofer de colectivo",me:"Vos, pasajero",reg:"tu",turns:[
["Ciao! Dove vai?","¡Hola! ¿Adónde vas?","gioia/vado/questo autobus","Vado a Gioia Tauro. Questo autobus va lì?","Voy a Gioia Tauro. ¿Este colectivo va para allá?","Decí adónde vas y confirmá el recorrido."],
["Sì, sì. Hai il biglietto?","Sí, sí. ¿Tenés el boleto?","si/no+biglietto/dove/compr","No, dove si compra il biglietto?","No, ¿dónde se compra el boleto?","Preguntá dónde se compra."],
["Lo fai qui con me: due euro.","Lo sacás acá conmigo: dos euros.","ecco/euro/carta/spiccioli","Ecco due euro.","Acá tenés dos euros.","Pagá con «ecco»."],
["Grazie. Siediti pure.","Gracias. Sentate.","mi dici/avvisi/scendere/quando","Mi dici quando devo scendere?","¿Me avisás cuándo me tengo que bajar?","Pedí que te avise."],
["Certo. Dove devi andare a Gioia?","Claro. ¿Adónde tenés que ir en Gioia?","stazione/centro/piazza","Alla stazione.","A la estación.","Decí el destino con «alla/al»."],
["Allora scendi alla seconda fermata dopo il ponte.","Entonces bajate en la segunda parada después del puente.","grazie/perfetto/capito","Perfetto, grazie mille!","¡Perfecto, muchas gracias!","Agradecé."]]}]},

u5:{gx:[
"g|Domani ___ al Comune. (andare, io)|vado/vado a/andiamo|0|Andare: io vado.",
"g|Voi ___ la spesa oggi? (fare)|fate/fatte/facete|0|Fare: voi fate.",
"g|Loro ___ da Roma. (venire)|vengono/venono/vieneno|0|Venire: loro vengono.",
"g|Tu ___ firmare qui. (dovere)|devi/deve/dovi|0|Dovere: tu devi.",
"g|Noi non ___ venire. (potere)|possiamo/potiamo/possono|0|Potere: noi possiamo.",
"g|Lui ___ un caffè. (volere)|vuole/vole/vuoi|0|Volere: lui vuole.",
"g|Io ___ alle otto. (uscire)|esco/uscio/esce|0|Uscire: io esco.",
"g|Che cosa ___ stasera? (fare, tu)|fai/fa/fate|0|Fare: tu fai.",
"g|Mi ___ il modulo? (dare, Lei)|dà/da/dai|0|Dare: Lei dà (con acento).",
"g|Io non ___ dov'è la posta. (sapere)|so/sapo/sa|0|Sapere: io so.",
"g|___ freddo oggi.|Fa/È/Ha|0|El clima: fa freddo.",
"g|Posso ___ un appuntamento?|prendere/fare di/avere di|0|Sacar turno: prendere un appuntamento.",
"t|Escribí en italiano: «No puedo venir».|Non posso venire|Potere + infinitivo.",
"t|Escribí en italiano: «¿Qué hacés?»|Che fai?~Cosa fai?~Che cosa fai?~Che fai~Cosa fai|Fare: tu fai.",
"t|Escribí en italiano: «Salgo un momento».|Esco un attimo~Esco un momento|Uscire: io esco.",
"e|Io devo di pagare l'affitto.|Io devo pagare l'affitto./Io devo a pagare l'affitto./Io dovo pagare l'affitto.|0|Dovere + infinitivo directo.",
"e|Noi potemo venire domani.|Noi possiamo venire domani./Noi potiamo venire domani./Noi possono venire domani.|0|Potere: noi possiamo.",
"e|Fa la spesa noi il sabato.|Facciamo la spesa il sabato./Fanno la spesa noi il sabato./Faciamo la spesa il sabato.|0|Fare: noi facciamo."],
map:["Uffici e documenti|Oficinas y documentos","Faccende|Mandados","Problemi in casa|Problemas en casa","Regole del palazzo|Reglas del edificio","Appuntamenti|Citas y turnos"],
build:`no funciona|non funziona
no funciona la calefacción|non funziona il riscaldamento
y hace frío en casa|e fa freddo in casa
¿puede venir a revisar?|può venire a controllare?
No funciona la calefacción y hace frío en casa: ¿puede venir a revisar?|Non funziona il riscaldamento e fa freddo in casa: può venire a controllare?`,
st:[{t:"Il frigorifero innamorato|La heladera enamorada",img:"Una heladera con corazones en los ojos mirando a la lavadora.",
l:`Nella casa di Lauti non funziona il frigorifero.|En la casa de Lauti no funciona la heladera.
Lauti chiama la signora Teresa, la padrona di casa.|Lauti llama a la señora Teresa, la dueña de la casa.
Il giorno dopo viene il tecnico e controlla tutto.|Al día siguiente viene el técnico y revisa todo.
«Il problema è semplice», dice. «Il frigorifero è innamorato della lavatrice».|«El problema es simple», dice. «La heladera está enamorada de la lavadora».
«E cosa devo fare?», chiede Lauti.|«¿Y qué tengo que hacer?», pregunta Lauti.
«Deve metterli vicini», risponde il tecnico.|«Tiene que ponerlas cerca», responde el técnico.
Adesso il frigorifero è in bagno, e funziona benissimo.|Ahora la heladera está en el baño, y funciona perfecto.`,
q:`Cosa non funziona?|Il frigorifero.
Di chi è innamorato il frigorifero?|Della lavatrice.
Dov'è adesso il frigorifero?|In bagno.`},
{t:"La posta delle sorprese|El correo de las sorpresas",img:"Una fila en el correo que llega hasta la plaza, con un perro que reparte números.",
l:`Lauti va in posta per mandare un pacco in Argentina.|Lauti va al correo para mandar un paquete a Argentina.
C'è una fila lunghissima: arriva fino alla piazza!|Hay una fila larguísima: ¡llega hasta la plaza!
Un cane prende i numeri e li dà a tutti.|Un perro agarra los números y se los da a todos.
Dopo due ore tocca a Lauti. L'impiegata dice: «Deve compilare il modulo».|Después de dos horas le toca a Lauti. La empleada dice: «Tiene que completar el formulario».
Lauti scrive tutto, ma il modulo è in latino!|Lauti escribe todo, ¡pero el formulario está en latín!
«È uno scherzo», ride l'impiegata, e gli dà quello giusto.|«Es una broma», se ríe la empleada, y le da el correcto.
Il pacco parte, e il cane lo saluta con la zampa.|El paquete sale, y el perro lo saluda con la pata.`,
q:`Perché va in posta Lauti?|Per mandare un pacco in Argentina.
Chi dà i numeri?|Un cane.
In che lingua è il primo modulo?|In latino.`}],
gc:[{t:"Il riscaldamento rotto",who:"La dueña de tu casa, una señora mayor",me:"Vos, el inquilino",reg:"lei",turns:[
["Pronto? Ah, Lauti! Tutto bene in casa?","¿Hola? ¡Ah, Lauti! ¿Todo bien en casa?","non funziona/riscaldamento/freddo/problema","Insomma... non funziona il riscaldamento.","Más o menos... no funciona la calefacción.","Contá el problema con «non funziona»."],
["Oh no! Da quando?","¡Ay, no! ¿Desde cuándo?","da/ieri/stamattina/giorni","Da ieri sera. Fa freddo in casa.","Desde anoche. Hace frío en casa.","«Da» + cuándo."],
["Mi dispiace. Domani mattina può venire il tecnico. Lei è a casa?","Lo siento. Mañana a la mañana puede venir el técnico. ¿Usted está en casa?","si/sono/posso/alle","Sì, sono a casa. Può venire alle nove?","Sí, estoy en casa. ¿Puede venir a las nueve?","Confirmá y proponé una hora."],
["Va bene, alle nove. C'è altro?","Está bien, a las nueve. ¿Hay algo más?","affitto/pagare/bonifico/no","Sì: posso pagare l'affitto con un bonifico?","Sí: ¿puedo pagar el alquiler con transferencia?","Preguntá cómo pagar el alquiler."],
["Certo, le mando l'IBAN su WhatsApp.","Claro, le mando el IBAN por WhatsApp.","perfetto/grazie/va bene","Perfetto, grazie mille.","Perfecto, muchas gracias.","Agradecé."],
["Si figuri! Buona serata, Lauti.","¡No es nada! Buenas noches, Lauti.","altrettanto/anche a lei/buona","Buona serata anche a Lei!","¡Buenas noches también para usted!","Devolvé el saludo con «anche a Lei»."]]},
{t:"In posta",who:"La empleada del correo",me:"Vos, que mandás un paquete",reg:"lei",turns:[
["Buongiorno, prego. Mi dica.","Buen día, adelante. Dígame.","pacco/mandare/spedire/vorrei","Buongiorno, vorrei mandare un pacco in Argentina.","Buen día, quisiera mandar un paquete a Argentina.","Usá «vorrei mandare»."],
["Certo. Deve compilare questo modulo.","Claro. Tiene que completar este formulario.","dove/firmare/penna/devo","Va bene. Dove devo firmare?","Está bien. ¿Dónde tengo que firmar?","Preguntá dónde firmar."],
["Qui in basso. Cosa c'è nel pacco?","Acá abajo. ¿Qué hay en el paquete?","regal/vestiti/libri/cose","Ci sono dei regali per la mia famiglia.","Hay unos regalos para mi familia.","Decí qué mandás."],
["Va bene. Lo mando con la spedizione normale o veloce?","Está bien. ¿Lo mando con envío normal o rápido?","normale/veloce+quanto/quando/tempo","Normale. Quanto tempo ci vuole per arrivare?","Normal. ¿Cuánto tarda en llegar?","Elegí una opción y preguntá cuánto tarda."],
["Più o meno tre settimane. Costa trentacinque euro.","Más o menos tres semanas. Cuesta treinta y cinco euros.","carta/pago/posso/ecco","Posso pagare con la carta?","¿Puedo pagar con tarjeta?","Preguntá por la tarjeta."],
["Sì, certo. Ecco la ricevuta.","Sí, claro. Acá está el recibo.","grazie/arrivederci","Grazie mille, arrivederci!","¡Muchas gracias, hasta luego!","Despedite con «arrivederci»."]]}]},

u6:{gx:[
"g|Lei ___ chiama Giulia.|si/se/ci|0|Ella: si chiama.",
"g|Noi ___ alziamo alle sette.|ci/si/vi|0|Noi: ci.",
"g|A che ora ___ svegli, tu?|ti/si/mi|0|Tú: ti.",
"g|Loro ___ divertono molto.|si/ci/vi|0|Ellos: si.",
"g|Io ___ vesto in cinque minuti.|mi/ti/si|0|Yo: mi.",
"g|Sono le otto ___ un quarto.|e/meno/più|0|Y cuarto: e un quarto.",
"g|Sono le nove ___ dieci (8:50).|meno/e/più|0|Menos: meno.",
"g|Ci vediamo ___ sette.|alle/a/le|0|«A las» = alle.",
"g|Pranzo ___ mezzogiorno.|a/alle/al|0|A mediodía: a mezzogiorno.",
"g|Non mi ___ mai il nome. (ricordare)|ricordo/ricorda/ricordi|0|Io: mi ricordo.",
"g|___ volta a settimana vado al mare.|Una/Un/Uno|0|Volta es femenino: una volta.",
"g|Di solito ___ alle undici. (andare a letto, io)|vado a letto/vado al letto/vado nel letto|0|Expresión fija: andare a letto.",
"t|Escribí en italiano: «Es la una y media».|È l'una e mezza~È l'una e mezzo~È l'una e trenta|La una: è l'una.",
"t|Escribí en italiano: «Me levanto a las siete».|Mi alzo alle sette|Reflexivo: mi alzo.",
"t|Escribí en italiano: «Nunca tomo café a la noche».|Non bevo mai il caffè la sera~Non bevo mai caffè la sera|Non… mai.",
"e|Mi chiamo Lauti e ti alzo presto.|Mi chiamo Lauti e mi alzo presto./Mi chiamo Lauti e si alzo presto./Mi chiamo Lauti e alzo presto.|0|Yo: mi alzo.",
"e|Sono l'una.|È l'una./Sono le una./È la una.|0|La una es singular: è l'una.",
"e|Vado alle letto a mezzanotte.|Vado a letto a mezzanotte./Vado al letto alla mezzanotte./Vado nel letto a mezzanotte.|0|Andare a letto; a mezzanotte."],
map:["La mattina|La mañana","Il lavoro|El trabajo","Le ore|Las horas","Il pomeriggio e la sera|La tarde y la noche","Abitudini|Costumbres"],
build:`me despierto|mi sveglio
me despierto a las siete|mi sveglio alle sette
me despierto a las siete y desayuno|mi sveglio alle sette e faccio colazione
y empiezo a trabajar a las nueve|e comincio a lavorare alle nove
Me despierto a las siete, desayuno y empiezo a trabajar a las nueve.|Mi sveglio alle sette, faccio colazione e comincio a lavorare alle nove.`,
st:[{t:"La sveglia gelosa|El despertador celoso",img:"Un despertador con brazos tirándole almohadas al celular de Lauti.",
l:`Lauti ha una sveglia vecchia e un telefono nuovo.|Lauti tiene un despertador viejo y un teléfono nuevo.
Ogni mattina il telefono suona alle sette.|Todas las mañanas el teléfono suena a las siete.
La sveglia è gelosa: «Io mi sveglio prima di tutti!»|El despertador está celoso: «¡Yo me despierto antes que todos!»
Così una notte suona alle tre, alle quattro e alle cinque.|Entonces una noche suena a las tres, a las cuatro y a las cinco.
Lauti si alza stanchissimo e si fa la doccia con il caffè.|Lauti se levanta cansadísimo y se baña con el café.
Alla fine fa la pace: il telefono suona alle sette, la sveglia alle sette e un minuto.|Al final hace las paces: el teléfono suena a las siete, el despertador a las siete y un minuto.
Ora sono amici, e Lauti si sveglia due volte, ma felice.|Ahora son amigos, y Lauti se despierta dos veces, pero feliz.`,
q:`A che ora suona il telefono?|Alle sette.
Perché la sveglia è gelosa?|Perché vuole svegliare Lauti per prima.
Come si sveglia adesso Lauti?|Due volte, ma felice.`},
{t:"Il pisolino infinito|La siesta infinita",img:"Todo el pueblo de Varapodio durmiendo la siesta, hasta el perro y el cura.",
l:`In Calabria il pomeriggio i negozi chiudono.|En Calabria, a la tarde, los negocios cierran.
Lauti vuole comprare il pane alle due, ma è tutto chiuso.|Lauti quiere comprar pan a las dos, pero está todo cerrado.
Va al bar: chiuso. Va in farmacia: chiusa.|Va al bar: cerrado. Va a la farmacia: cerrada.
In piazza dormono tutti: il barista, il prete e anche il cane.|En la plaza duermen todos: el barista, el cura y hasta el perro.
Allora Lauti si siede su una panchina e si addormenta anche lui.|Entonces Lauti se sienta en un banco y se duerme él también.
Si sveglia alle cinque: il paese è aperto e pieno di gente.|Se despierta a las cinco: el pueblo está abierto y lleno de gente.
«Buon pomeriggio, Lauti!», gli dice il barista. «Ti sei riposato?»|«¡Buenas tardes, Lauti!», le dice el barista. «¿Descansaste?»`,
q:`Cosa vuole comprare Lauti?|Il pane.
Chi dorme in piazza?|Il barista, il prete e il cane.
A che ora si sveglia Lauti?|Alle cinque.`}],
gc:[{t:"La giornata di Lauti",who:"Giulia, tu amiga",me:"Vos",reg:"tu",turns:[
["Ciao Lauti! A che ora ti svegli di solito?","¡Hola Lauti! ¿A qué hora te despertás normalmente?","mi sveglio/alle","Mi sveglio alle sette.","Me despierto a las siete.","«Mi sveglio alle…»."],
["Presto! E cosa fai la mattina?","¡Temprano! ¿Y qué hacés a la mañana?","colazione/doccia/caffè/lavoro","Faccio colazione e poi comincio a lavorare.","Desayuno y después empiezo a trabajar.","Contá dos cosas de tu mañana."],
["A che ora finisci di lavorare?","¿A qué hora terminás de trabajar?","finisco/alle/sei/sette","Finisco alle sei di sera.","Termino a las seis de la tarde.","«Finisco alle…»."],
["E dopo il lavoro?","¿Y después del trabajo?","passeggiata/studio/riposo/esco/palestra","Faccio una passeggiata e studio italiano.","Salgo a caminar y estudio italiano.","Contá qué hacés."],
["Bravo! Ci vediamo sabato per un aperitivo?","¡Bien! ¿Nos vemos el sábado para un aperitivo?","si/volentieri/certo+a che ora/alle/ore","Volentieri! A che ora?","¡Con gusto! ¿A qué hora?","Aceptá y preguntá la hora."],
["Alle sette in piazza, va bene?","A las siete en la plaza, ¿está bien?","va bene/perfetto/ci vediamo","Perfetto, ci vediamo sabato!","¡Perfecto, nos vemos el sábado!","Cerrá con «ci vediamo»."]]},
{t:"Sono in ritardo!",who:"Marco, un amigo que te espera",me:"Vos, que llegás tarde",reg:"tu",turns:[
["Pronto, Lauti? Dove sei? Sono già al bar!","¿Hola, Lauti? ¿Dónde estás? ¡Ya estoy en el bar!","scusa/ritardo","Scusa, sono in ritardo!","¡Perdón, llego tarde!","Pedí perdón: «sono in ritardo»."],
["Che è successo?","¿Qué pasó?","sveglia/svegliato/non ho sentito/dormito","Non ho sentito la sveglia.","No escuché el despertador.","Dá una excusa."],
["Ah, capito! Quando arrivi?","¡Ah, entendido! ¿Cuándo llegás?","minuti/arrivo/tra","Arrivo tra dieci minuti.","Llego en diez minutos.","«Arrivo tra…» + tiempo."],
["Va bene. Ti ordino un caffè?","Está bien. ¿Te pido un café?","si/grazie/no+caffè/cappuccino","Sì, grazie! Un caffè.","¡Sí, gracias! Un café.","Aceptá o elegí otra cosa."],
["Ok. Ma sbrigati!","Ok. ¡Pero apurate!","arrivo/subito/corro","Arrivo subito, ciao!","¡Ya llego, chau!","Decí que vas enseguida."]]}]}
};
