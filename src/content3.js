/* ===== Ruta: 12-week program (A1 → B1), built around life in Calabria =====
   ch: 20 chunks "it|es" (4 new per day, days 1-5)
   gx: grammar items  g|question with ___|opt/opt/opt|correct index|why
                       t|prompt|answer~alternative|why
                       e|wrong sentence|correct/wrong/wrong|correct index|why
   dlg: A = the other person, T = you          sp: speed questions "q|model answer"
   pl: 2 placement items (g format)            les: existing Studio lessons for this grammar
*/
const UNITS_RAW=[
{id:"u1",t:"Presentarte",sit:"El anagrafe y los primeros días",g:"Essere, avere y artículos",tag:"essere/avere",c:"green",les:["ess","art"],pron:"acc",
 can:["Decir quién sos, de dónde venís y por qué estás en Italia","Dar tus datos en un trámite","Usar essere y avere sin dudar"],
 ch:`Mi chiamo Lautaro, ma tutti mi chiamano Lauti.|Me llamo Lautaro, pero todos me dicen Lauti.
Sono argentino, di Córdoba.|Soy argentino, de Córdoba.
Sono qui per la cittadinanza.|Estoy acá por la ciudadanía.
Il mio bisnonno era di Varapodio.|Mi bisabuelo era de Varapodio.
Ho trentadue anni.|Tengo treinta y dos años.
Abito a Varapodio da pochi giorni.|Vivo en Varapodio desde hace pocos días.
Lavoro da remoto.|Trabajo en forma remota.
Piacere, sono Lauti.|Mucho gusto, soy Lauti.
Ho un appuntamento all'anagrafe.|Tengo un turno en el registro civil.
Ecco il mio passaporto.|Acá está mi pasaporte.
Ho tutti i documenti.|Tengo todos los documentos.
Mi manca qualche documento?|¿Me falta algún documento?
Il mio cognome è Tomassich.|Mi apellido es Tomassich.
Si scrive con due esse.|Se escribe con dos eses.
Ho una domanda.|Tengo una pregunta.
È questo l'ufficio giusto?|¿Es esta la oficina correcta?
Sono stanco ma contento.|Estoy cansado pero contento.
Oggi ho freddo.|Hoy tengo frío.
Che cosa devo portare?|¿Qué tengo que traer?
Quanto tempo ci vuole?|¿Cuánto tiempo lleva?`,
 gx:[
 "g|Io ___ argentino.|sono/ho/sto|0|Nacionalidad y origen van con essere: io sono.",
 "g|___ trentadue anni.|Ho/Sono/Faccio|0|La edad va con avere: ho … anni.",
 "g|Lei ___ il passaporto?|ha/è/sta|0|Tener = avere: Lei ha.",
 "g|Noi ___ qui per la cittadinanza.|siamo/abbiamo/stiamo|0|Estar en un lugar = essere: siamo qui.",
 "g|Ho ___ appuntamento alle dieci.|un/uno/una|0|Masculino que empieza con vocal: un (sin apóstrofo).",
 "g|Dov'è ___ ufficio anagrafe?|l'/il/lo|0|Delante de vocal: l'.",
 "g|Ecco ___ documenti.|i/gli/le|0|Masculino plural que empieza con consonante: i.",
 "g|Dove sono ___ uffici?|gli/i/le|0|Masculino plural que empieza con vocal: gli.",
 "t|Escribí en italiano: «Tengo frío».|Ho freddo|Sensaciones con avere: ho freddo, ho fame, ho sonno.",
 "t|Escribí en italiano: «Estoy cansado».|Sono stanco|Estados con essere: sono stanco.",
 "e|Io ho argentino.|Io sono argentino./Io sto argentino./Io è argentino.|0|El origen va con essere.",
 "e|Sono trenta anni.|Ho trent'anni./Ho trenta anni sono./Sono di trenta anni.|0|La edad va con avere.",
 "e|La passaporto è qui.|Il passaporto è qui./Lo passaporto è qui./L'passaporto è qui.|0|Passaporto es masculino: il passaporto."],
 dlg:`A: Buongiorno, mi dica. | Buen día, dígame.
T: Buongiorno, ho un appuntamento per la residenza. | Buen día, tengo turno para la residencia.
A: Come si chiama? | ¿Cómo se llama?
T: Mi chiamo Lautaro Tomassich. Il cognome si scrive con due esse. | Me llamo Lautaro Tomassich. El apellido se escribe con dos eses.
A: Perfetto. Di dov'è? | Perfecto. ¿De dónde es?
T: Sono argentino, di Córdoba. Il mio bisnonno era di Varapodio. | Soy argentino, de Córdoba. Mi bisabuelo era de Varapodio.
A: Ha il passaporto e il codice fiscale? | ¿Tiene el pasaporte y el código fiscal?
T: Sì, ecco il passaporto. Ho tutti i documenti. | Sí, acá está el pasaporte. Tengo todos los documentos.
A: Benissimo. Tra qualche giorno passa il vigile per il controllo. | Muy bien. En unos días pasa el agente municipal para el control.
T: Va bene. Quanto tempo ci vuole? | Está bien. ¿Cuánto tiempo lleva?`,
 reg:"lei",role:"an employee of the anagrafe office in Varapodio",me:"Lautaro, registering his residence for Italian citizenship",
 open:["Buongiorno! Mi dica, come posso aiutarla?","¡Buen día! Dígame, ¿en qué puedo ayudarlo?","Buongiorno, ho un appuntamento per la residenza.","Buen día, tengo turno para la residencia."],
 sp:`Come ti chiami?|Mi chiamo Lauti.
Di dove sei?|Sono argentino, di Córdoba.
Quanti anni hai?|Ho trentadue anni.
Perché sei in Italia?|Sono qui per la cittadinanza.
Dove abiti?|Abito a Varapodio.
Lavori?|Sì, lavoro da remoto.
Sei stanco oggi?|Sì, sono un po' stanco.
Hai tutti i documenti?|Sì, ho tutti i documenti.`,
 mis:[["Presentate a un vecino o a quien te atiende en un negocio: nombre, de dónde sos y por qué estás acá.","Piacere, sono Lauti. Sono argentino, sono qui per la cittadinanza."],["Preguntá en una oficina o negocio si es el lugar correcto.","Scusi, è questo l'ufficio giusto?"],["Decile a alguien que estás aprendiendo y pedile que hable despacio.","Sto imparando l'italiano: può parlare più lentamente?"]],
 pl:["g|___ trent'anni.|Ho/Sono/Sto|0","g|Dov'è ___ ufficio?|l'/il/lo|0"]},

{id:"u2",t:"Bar y comida",sit:"Pedir, recomendar y pagar",g:"Presente -are, vorrei y números",tag:"presente",c:"salmon",les:["pres"],pron:"cg",
 can:["Pedir en un bar o restaurante con cortesía","Entender precios y pagar","Conjugar los verbos -are en presente"],
 rx:`<p><b>Para pedir con cortesía: <i>vorrei</i></b> (quisiera). <i>Voglio</i> (quiero) suena brusco en un bar.</p>
<p><b>Números clave:</b> uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci · undici, dodici, tredici, quattordici, quindici, sedici, diciassette, diciotto, diciannove · venti, trenta, quaranta, cinquanta, sessanta, settanta, ottanta, novanta, cento.</p>
<p>Los precios se dicen así: <button class="say" data-say="due euro e cinquanta">2,50 € = due euro e cinquanta</button>. <i>Euro</i> no cambia en plural.</p>`,
 ch:`Vorrei un caffè, per favore.|Quisiera un café, por favor.
Per me un cornetto alla crema.|Para mí una medialuna con crema.
Quanto costa?|¿Cuánto cuesta?
Quant'è in tutto?|¿Cuánto es en total?
Posso pagare con la carta?|¿Puedo pagar con tarjeta?
Pago in contanti.|Pago en efectivo.
Il conto, per favore.|La cuenta, por favor.
Da portare via, grazie.|Para llevar, gracias.
Avete un tavolo per due?|¿Tienen una mesa para dos?
Cosa mi consiglia?|¿Qué me recomienda?
Prendo la pasta del giorno.|Pido la pasta del día.
Senza formaggio, per favore.|Sin queso, por favor.
Un bicchiere di vino rosso.|Una copa de vino tinto.
Un'acqua naturale.|Un agua sin gas.
Era buonissimo!|¡Estaba riquísimo!
Mangio spesso fuori.|Como afuera seguido.
La mattina bevo il caffè al bar.|A la mañana tomo el café en el bar.
Parlo un po' di italiano.|Hablo un poco de italiano.
Possiamo avere ancora un po' di pane?|¿Nos puede traer un poco más de pan?
Tenga il resto.|Quédese con el vuelto.`,
 gx:[
 "g|Io ___ un caffè ogni mattina.|prendo/prendi/prende|0|Yo termina en -o: io prendo.",
 "g|Tu ___ italiano molto bene!|parli/parla/parlo|0|Tú termina en -i: tu parli.",
 "g|Noi ___ alle otto.|mangiamo/mangiate/mangiano|0|Nosotros: -iamo.",
 "g|Loro ___ al bar.|lavorano/lavoriamo/lavora|0|Ellos, verbos -are: -ano.",
 "g|Signora, Lei ___ con la carta?|paga/paghi/pago|0|Lei usa la forma de él/ella: paga.",
 "g|___ un tavolo per due, per favore.|Vorrei/Voglio di/Vorrebbe|0|Para pedir con cortesía: vorrei.",
 "g|Il caffè costa un euro e ___ (1,20 €).|venti/dodici/due|0|20 = venti.",
 "t|Escribí en italiano: «Como pasta».|Mangio la pasta~Mangio pasta|Mangiare, yo: mangio.",
 "t|Escribí el número 15 en letras.|quindici|15 = quindici.",
 "t|Escribí el número 50 en letras.|cinquanta|50 = cinquanta.",
 "e|Io parlare italiano.|Io parlo italiano./Io parla italiano./Io parli italiano.|0|Hay que conjugar: io parlo.",
 "e|Noi mangiano al ristorante.|Noi mangiamo al ristorante./Noi mangiate al ristorante./Noi mangia al ristorante.|0|Noi termina en -iamo."],
 dlg:`A: Buonasera! Siete in due? | ¡Buenas noches! ¿Son dos?
T: Sì, avete un tavolo per due? | Sí, ¿tienen una mesa para dos?
A: Certo, prego. Cosa vi porto da bere? | Claro, adelante. ¿Qué les traigo para tomar?
T: Un bicchiere di vino rosso e un'acqua naturale. | Una copa de vino tinto y un agua sin gas.
A: Ecco il menù. Oggi c'è la pasta con la 'nduja. | Acá está el menú. Hoy hay pasta con 'nduja.
T: Cosa mi consiglia? | ¿Qué me recomienda?
A: La pasta del giorno è buonissima, ma un po' piccante. | La pasta del día es riquísima, pero un poco picante.
T: Perfetto, prendo la pasta del giorno. | Perfecto, pido la pasta del día.
A: Tutto bene? | ¿Todo bien?
T: Era buonissimo! Il conto, per favore. Posso pagare con la carta? | ¡Estaba riquísimo! La cuenta, por favor. ¿Puedo pagar con tarjeta?`,
 reg:"tu",role:"a young waiter (about 30) in a trattoria in Taurianova",me:"a customer having dinner",
 open:["Ciao, buonasera! Avete prenotato?","¡Hola, buenas noches! ¿Tienen reserva?","No, avete un tavolo per due?","No, ¿tienen una mesa para dos?"],
 sp:`Cosa prendi?|Prendo un caffè.
Come paghi?|Pago con la carta.
Mangi la carne?|Sì, mangio la carne.
Cosa bevi la sera?|Bevo un bicchiere di vino.
Quanto costa il caffè qui?|Costa un euro.
Parli italiano?|Sì, parlo un po' di italiano.
Dove mangi oggi?|Mangio a casa.
Prendi il dolce?|No, grazie, basta così.`,
 mis:[["Pedí en el bar con «vorrei» y preguntá cuánto es.","Vorrei un caffè, per favore. Quant'è?"],["Pedile una recomendación a quien te atiende.","Cosa mi consiglia?"],["Al terminar de comer, decí que estaba riquísimo.","Era buonissimo, grazie!"]],
 pl:["g|Noi ___ alle nove.|mangiamo/mangiano/mangiate|0","g|___ un caffè, per favore.|Vorrei/Volere/Vuole di|0"]},

{id:"u3",t:"De compras",sit:"Tiendas, mercado y supermercado",g:"Presente -ere/-ire y plurales",tag:"plurales",c:"lime",les:["pres","art"],pron:"doppie",
 can:["Comprar ropa, comida y cosas de la casa","Probarte, comparar y pedir otro talle","Formar plurales y conjugar -ere/-ire"],
 ch:`Cerco un paio di scarpe.|Busco un par de zapatos.
Posso provarle?|¿Me los puedo probar?
Avete una taglia più grande?|¿Tienen un talle más grande?
Ce l'ha in nero?|¿Lo tiene en negro?
Mi stanno strette.|Me quedan ajustados.
Quanto vengono queste?|¿Cuánto salen estos?
Do solo un'occhiata, grazie.|Solo estoy mirando, gracias.
Prendo questo.|Me llevo este.
Mi fa uno sconto?|¿Me hace un descuento?
Dov'è la cassa?|¿Dónde está la caja?
Vorrei due etti di prosciutto.|Quisiera doscientos gramos de jamón.
Un chilo di pomodori, per favore.|Un kilo de tomates, por favor.
Sono freschi?|¿Son frescos?
Mi serve un caricabatterie.|Necesito un cargador.
A che ora chiudete?|¿A qué hora cierran?
Non trovo il latte.|No encuentro la leche.
Lo prendo, grazie.|Me lo llevo, gracias.
Mi dà anche una busta?|¿Me da también una bolsa?
Preferisco quello rosso.|Prefiero el rojo.
Capisco, grazie lo stesso.|Entiendo, gracias igual.`,
 gx:[
 "g|Io ___ il pane qui ogni giorno. (prendere)|prendo/prende/prendono|0|Verbos -ere, yo: -o.",
 "g|Tu ___ la finestra? (aprire)|apri/apre/apro|0|Verbos -ire, tú: -i.",
 "g|Noi ___ le scarpe nere. (preferire)|preferiamo/preferiscono/preferisco|0|Noi no lleva -isc-: preferiamo.",
 "g|Lui ___ il rosso. (preferire)|preferisce/prefere/preferiamo|0|Preferire lleva -isc-: lui preferisce.",
 "g|Loro ___ alle otto. (chiudere)|chiudono/chiudiamo/chiude|0|Verbos -ere, ellos: -ono.",
 "g|Plural de «il negozio»:|i negozi/gli negozi/le negozie|0|-o pasa a -i, con el artículo i.",
 "g|Plural de «lo zaino»:|gli zaini/i zaini/lo zaini|0|Lo pasa a gli.",
 "t|Escribí el plural: il pomodoro|i pomodori|-o → -i, il → i.",
 "t|Escribí el plural: la scarpa|le scarpe|-a → -e, la → le.",
 "t|Escribí el plural: la borsa|le borse|Femenino: -a → -e.",
 "e|Io capiscono l'italiano.|Io capisco l'italiano./Io capise l'italiano./Io capiamo l'italiano.|0|Capire: io capisco.",
 "e|Le scarpa sono nere.|Le scarpe sono nere./La scarpe sono nere./Le scarpi sono nere.|0|Femenino plural: -e, con el artículo le."],
 dlg:`A: Ciao! Posso aiutarti? | ¡Hola! ¿Te ayudo?
T: Sì, cerco un paio di scarpe da ginnastica. | Sí, busco un par de zapatillas.
A: Che numero porti? | ¿Qué número calzás?
T: Il quarantadue. Posso provare queste? | El cuarenta y dos. ¿Puedo probarme estas?
A: Certo. Come ti stanno? | Claro. ¿Cómo te quedan?
T: Mi stanno un po' strette. Avete il quarantatré? | Me quedan un poco ajustadas. ¿Tienen el cuarenta y tres?
A: Sì, ecco. Le abbiamo anche in nero. | Sí, acá están. También las tenemos en negro.
T: Preferisco quelle nere. Quanto vengono? | Prefiero las negras. ¿Cuánto salen?
A: Sessanta euro, ma oggi c'è il dieci per cento di sconto. | Sesenta euros, pero hoy hay diez por ciento de descuento.
T: Perfetto, le prendo. | Perfecto, me las llevo.`,
 reg:"tu",role:"a young shop assistant in a shoe and clothes shop in Taurianova",me:"a customer looking for shoes or clothes",
 open:["Ciao! Cerchi qualcosa in particolare?","¡Hola! ¿Buscás algo en particular?","Sì, cerco un paio di scarpe.","Sí, busco un par de zapatos."],
 sp:`Cosa cerchi?|Cerco un paio di scarpe.
Che colore preferisci?|Preferisco il nero.
Dove compri la frutta?|Compro la frutta al mercato.
A che ora chiude il supermercato?|Chiude alle venti.
Capisci tutto?|Capisco quasi tutto.
Quanti pomodori prendi?|Prendo un chilo di pomodori.
Ti serve una busta?|Sì, grazie.
Vuoi provare le scarpe?|Sì, posso provarle?`,
 mis:[["En la verdulería o la fiambrería pedí un kilo o dos «etti» de algo.","Un chilo di pomodori, per favore."],["Entrá a un negocio y decí que solo estás mirando.","Do solo un'occhiata, grazie."],["Preguntá a qué hora cierran.","A che ora chiudete?"]],
 pl:["g|Lui ___ il rosso. (preferire)|preferisce/prefere/preferiscono|0","g|Plural de «lo zaino»:|gli zaini/i zaini/le zaine|0"]},

{id:"u4",t:"Moverte",sit:"Tren, colectivo y direcciones",g:"Preposiciones con artículo · c'è / ci sono",tag:"preposiciones",c:"yellow",les:["prep"],pron:"sc",
 can:["Comprar boletos y entender horarios","Preguntar cómo llegar y dónde bajar","Usar al, alla, nel, dal… sin pensar"],
 ch:`Un biglietto per Reggio Calabria, per favore.|Un boleto a Reggio Calabria, por favor.
Andata e ritorno.|Ida y vuelta.
Da quale binario parte?|¿De qué andén sale?
A che ora parte il prossimo treno?|¿A qué hora sale el próximo tren?
Il treno è in ritardo?|¿El tren está atrasado?
Devo cambiare?|¿Tengo que hacer transbordo?
Dove si compra il biglietto dell'autobus?|¿Dónde se compra el boleto del colectivo?
Scusi, questo autobus va a Gioia Tauro?|Disculpe, ¿este colectivo va a Gioia Tauro?
Mi dice quando devo scendere?|¿Me avisa cuándo me tengo que bajar?
La fermata è davanti alla chiesa.|La parada está frente a la iglesia.
Vado alla stazione.|Voy a la estación.
Arrivo dall'aeroporto di Lamezia.|Llego del aeropuerto de Lamezia.
Il biglietto è nello zaino.|El boleto está en la mochila.
C'è un bagno sul treno?|¿Hay baño en el tren?
Ci sono autobus la domenica?|¿Hay colectivos los domingos?
Quanto ci vuole per arrivare a Palmi?|¿Cuánto se tarda en llegar a Palmi?
Devo convalidare il biglietto?|¿Tengo que validar el boleto?
È libero questo posto?|¿Está libre este asiento?
Scendo alla prossima.|Me bajo en la próxima.
Ho perso il treno.|Perdí el tren.`,
 gx:[
 "g|Vado ___ stazione.|alla/al/allo|0|a + la = alla.",
 "g|Il treno arriva ___ Roma.|da/dal/della|0|Con ciudades no va artículo: da Roma.",
 "g|Arrivo ___ aeroporto.|dall'/dal/dallo|0|da + l' = dall'.",
 "g|Il biglietto è ___ zaino.|nello/nel/nella|0|in + lo = nello.",
 "g|La chiave è ___ tavolo.|sul/sullo/sulla|0|su + il = sul.",
 "g|Vado ___ Varapodio.|a/in/al|0|Con ciudades: a.",
 "g|Vado ___ Italia.|in/a/nell'|0|Con países: in, sin artículo.",
 "g|___ un bagno sul treno?|C'è/Ci sono/È|0|Singular: c'è.",
 "g|___ due treni al giorno.|Ci sono/C'è/Sono|0|Plural: ci sono.",
 "t|Completá: «el horario del tren» → l'orario ___ treno|del|di + il = del.",
 "e|Vado a la stazione.|Vado alla stazione./Vado al stazione./Vado in la stazione.|0|a + la se juntan: alla.",
 "e|Il libro è in il zaino.|Il libro è nello zaino./Il libro è nel zaino./Il libro è nella zaino.|0|in + lo = nello."],
 dlg:`T: Buongiorno, un biglietto per Reggio Calabria, per favore. | Buen día, un boleto a Reggio Calabria, por favor.
A: Solo andata o andata e ritorno? | ¿Solo ida o ida y vuelta?
T: Andata e ritorno. A che ora parte il prossimo treno? | Ida y vuelta. ¿A qué hora sale el próximo tren?
A: Alle dieci e un quarto, dal binario due. | A las diez y cuarto, del andén dos.
T: Devo cambiare? | ¿Tengo que hacer transbordo?
A: No, è diretto. Arriva alle undici e mezza. | No, es directo. Llega a las once y media.
T: Quanto costa? | ¿Cuánto cuesta?
A: Sono undici euro e quaranta. Ricordati di convalidare il biglietto. | Son once euros con cuarenta. Acordate de validar el boleto.
T: Grazie. Scusi, dov'è il binario due? | Gracias. Disculpe, ¿dónde está el andén dos?
A: In fondo a destra, dopo il bar. | Al fondo a la derecha, después del bar.`,
 reg:"tu",role:"a young employee at the Gioia Tauro train station ticket office, or a young bus driver",me:"a traveller going somewhere in Calabria",
 open:["Ciao! Dove devi andare?","¡Hola! ¿Adónde tenés que ir?","Buongiorno, un biglietto per Reggio Calabria, per favore.","Buen día, un boleto a Reggio Calabria, por favor."],
 sp:`Dove vai?|Vado alla stazione.
Da dove arrivi?|Arrivo dall'aeroporto.
A che ora parte il treno?|Parte alle dieci.
Dov'è il biglietto?|È nello zaino.
Prendi l'autobus o il treno?|Prendo il treno.
C'è un bar in stazione?|Sì, c'è un bar.
Dove scendi?|Scendo alla prossima.
Quanto ci vuole?|Ci vuole un'ora.`,
 mis:[["Preguntá en la parada si ese colectivo va adonde querés.","Scusi, questo autobus va a Gioia Tauro?"],["Mirá un horario y decí en voz alta a qué hora sale el próximo.","Il prossimo parte alle…"],["Pedile al chofer que te avise dónde bajar.","Mi dice quando devo scendere?"]],
 pl:["g|Vado ___ stazione.|alla/al/a la|0","g|Il libro è ___ zaino.|nello/nel/nella|0"]},

{id:"u5",t:"Casa y trámites",sit:"Alquiler, banco, correo y problemas en casa",g:"Verbos irregulares: andare, fare, venire, dovere, potere, volere",tag:"irregulares",c:"coral",les:["irr"],pron:"gli",
 can:["Resolver problemas de la casa","Sacar turnos y hacer trámites","Usar los irregulares más frecuentes"],
 ch:`Devo fare il codice fiscale.|Tengo que sacar el código fiscal.
Posso prendere un appuntamento?|¿Puedo sacar un turno?
Voglio aprire un conto in banca.|Quiero abrir una cuenta en el banco.
Faccio la spesa il sabato.|Hago las compras los sábados.
Vado in posta domani.|Voy al correo mañana.
Vieni con me?|¿Venís conmigo?
Non funziona il riscaldamento.|No funciona la calefacción.
Manca l'acqua calda.|Falta el agua caliente.
Può venire a controllare?|¿Puede venir a revisar?
Devo pagare l'affitto entro il cinque.|Tengo que pagar el alquiler antes del cinco.
Dove posso buttare la spazzatura?|¿Dónde puedo tirar la basura?
Che giorno passa la plastica?|¿Qué día pasa la recolección de plástico?
Posso lasciare un pacco qui?|¿Puedo dejar un paquete acá?
Mi dà il modulo, per favore?|¿Me da el formulario, por favor?
Dove devo firmare?|¿Dónde tengo que firmar?
Non posso venire domani.|No puedo venir mañana.
Facciamo alle dieci?|¿Hacemos a las diez?
Esco un attimo e torno.|Salgo un momento y vuelvo.
Sto cercando una casa in affitto.|Estoy buscando una casa para alquilar.
Fa freddo in casa.|Hace frío en casa.`,
 gx:[
 "g|Io ___ al supermercato.|vado/vo/ando|0|Andare: io vado.",
 "g|Noi ___ la spesa insieme.|facciamo/fariamo/fanno|0|Fare: noi facciamo.",
 "g|Tu ___ con noi stasera?|vieni/veni/viene|0|Venire: tu vieni.",
 "g|Io ___ pagare l'affitto.|devo/debo/devi|0|Dovere: io devo.",
 "g|___ entrare? (yo, pidiendo permiso)|Posso/Puedo/Può io|0|Potere: io posso.",
 "g|Loro ___ venire domani.|vogliono/volono/vuole|0|Volere: loro vogliono.",
 "g|Lei ___ firmare qui, per favore. (dovere)|deve/devo/dove|0|Lei deve. Ojo: dove = dónde.",
 "g|Che tempo ___? Fa freddo.|fa/è/ha|0|El clima va con fare: fa freddo.",
 "t|Escribí en italiano: «Voy al correo».|Vado in posta~Vado alla posta|Andare: io vado.",
 "t|Escribí en italiano: «Tengo que firmar».|Devo firmare|Dovere + infinitivo, sin «de».",
 "e|Io faccio di andare al Comune.|Io devo andare al Comune./Io vado di andare al Comune./Io ho andare al Comune.|0|Obligación: dovere + infinitivo, sin «di».",
 "e|Loro vanno a fanno la spesa.|Loro vanno a fare la spesa./Loro vanno fare la spesa./Loro vanno a fa la spesa.|0|Después de «a» va el infinitivo."],
 dlg:`T: Buongiorno signora, sono Lauti, l'inquilino del secondo piano. | Buen día señora, soy Lauti, el inquilino del segundo piso.
A: Ah, buongiorno Lauti! Tutto bene? | ¡Ah, buen día, Lauti! ¿Todo bien?
T: Insomma... non funziona il riscaldamento e fa freddo in casa. | Más o menos... no funciona la calefacción y hace frío en casa.
A: Mi dispiace! Domani mattina viene il tecnico. Lei è a casa? | ¡Lo siento! Mañana a la mañana viene el técnico. ¿Usted está en casa?
T: Domani lavoro, ma posso aprire alle nove. Va bene? | Mañana trabajo, pero puedo abrir a las nueve. ¿Está bien?
A: Perfetto. Un'altra cosa: l'affitto si paga entro il cinque. | Perfecto. Otra cosa: el alquiler se paga antes del cinco.
T: Certo. Posso fare un bonifico? | Claro. ¿Puedo hacer una transferencia?
A: Sì, le mando l'IBAN. | Sí, le mando el IBAN.
T: Grazie. E dove devo buttare la spazzatura? | Gracias. ¿Y dónde tengo que tirar la basura?
A: Qui si fa la differenziata: il martedì passa la plastica. | Acá se separa: los martes pasa el plástico.`,
 reg:"lei",role:"his landlady, a kind older woman from Varapodio, or an employee at the post office or bank",me:"a tenant solving problems and errands",
 open:["Pronto? Ah, Lauti, buongiorno! Tutto a posto in casa?","¿Hola? ¡Ah, Lauti, buen día! ¿Todo en orden en la casa?","Buongiorno signora, non funziona il riscaldamento.","Buen día señora, no funciona la calefacción."],
 sp:`Dove vai domani?|Vado in posta.
Cosa devi fare oggi?|Devo fare la spesa.
Puoi venire alle dieci?|Sì, posso venire.
Vuoi un caffè?|Sì, grazie, volentieri.
Che tempo fa?|Fa freddo.
Vieni con noi?|Sì, vengo volentieri.
Esci stasera?|No, stasera sto a casa.
Cosa fai il sabato?|Faccio la spesa.`,
 mis:[["Preguntale a un vecino qué día pasa cada residuo.","Che giorno passa la plastica?"],["Andá o llamá a algún lugar y pedí un turno.","Posso prendere un appuntamento?"],["Contale a alguien algo que tenés que hacer hoy, con «devo».","Oggi devo…"]],
 pl:["g|Noi ___ la spesa insieme.|facciamo/fariamo/fanno|0","g|Io ___ pagare l'affitto.|devo/debo/dovo|0"]},

{id:"u6",t:"Tu rutina",sit:"Horarios, el día a día y quedar con gente",g:"Verbos reflexivos y la hora",tag:"reflexivos",c:"stone",les:[],pron:"z",
 can:["Contar tu día de la mañana a la noche","Decir y preguntar la hora","Usar mi, ti, si, ci, vi con los reflexivos"],
 rx:`<p><b>Reflexivos:</b> el pronombre va antes del verbo, como en español.</p>
<div class="tbl-wrap"><table><tr><th></th><th>svegliarsi</th></tr><tr><td>io</td><td><b>mi</b> sveglio</td></tr><tr><td>tu</td><td><b>ti</b> svegli</td></tr><tr><td>lui / lei / Lei</td><td><b>si</b> sveglia</td></tr><tr><td>noi</td><td><b>ci</b> svegliamo</td></tr><tr><td>voi</td><td><b>vi</b> svegliate</td></tr><tr><td>loro</td><td><b>si</b> svegliano</td></tr></table></div>
<p>Ojo: <i>vestirsi</i> = vestirse, <i>trovarsi bene</i> = sentirse a gusto, <i>ricordarsi</i> = acordarse.</p>
<p><b>La hora:</b> <i>Che ore sono?</i> → <b>Sono le</b> tre, le otto e mezza, le nove meno un quarto. Excepción: <b>È l'una</b>, è mezzogiorno, è mezzanotte. «A las…» = <b>alle</b> sette (pero <b>all'</b>una).</p>`,
 ch:`Mi sveglio alle sette.|Me despierto a las siete.
Mi alzo subito.|Me levanto enseguida.
Mi faccio la doccia e mi vesto.|Me baño y me visto.
Faccio colazione a casa.|Desayuno en casa.
Comincio a lavorare alle nove.|Empiezo a trabajar a las nueve.
Finisco alle sei di sera.|Termino a las seis de la tarde.
Che ore sono? Sono le otto e mezza.|¿Qué hora es? Son las ocho y media.
È l'una.|Es la una.
A mezzogiorno pranzo.|Al mediodía almuerzo.
Di solito ceno verso le nove.|Por lo general ceno a eso de las nueve.
Il pomeriggio faccio una passeggiata.|A la tarde salgo a caminar.
Vado a letto a mezzanotte.|Me voy a dormir a medianoche.
Mi riposo un po'.|Descanso un poco.
Ci vediamo dopo il lavoro?|¿Nos vemos después del trabajo?
Non mi ricordo.|No me acuerdo.
Mi trovo bene qui.|Me siento a gusto acá.
Non bevo mai il tè.|Nunca tomo té.
Ogni tanto vado al mare.|De vez en cuando voy al mar.
Sono in ritardo, scusa!|¡Llego tarde, perdón!
Ci sentiamo stasera.|Hablamos esta noche.`,
 gx:[
 "g|Io ___ sveglio presto.|mi/ti/si|0|Yo: mi.",
 "g|Tu ___ alzi tardi.|ti/mi/si|0|Tú: ti.",
 "g|Lui ___ chiama Marco.|si/ti/mi|0|Él o ella: si.",
 "g|Noi ___ vediamo domani.|ci/vi/si|0|Nosotros: ci.",
 "g|Voi ___ divertite?|vi/ci/si|0|Vosotros: vi.",
 "g|Sono ___ tre.|le/la/i|0|La hora: sono le tre.",
 "g|___ l'una.|È/Sono/Ha|0|La una es singular: è l'una.",
 "t|Escribí en italiano: «Son las ocho y media».|Sono le otto e mezza~Sono le otto e mezzo~Sono le otto e trenta|Sono le + hora.",
 "t|Escribí en italiano: «Me despierto a las siete».|Mi sveglio alle sette|Reflexivo + alle.",
 "e|Io sveglio alle sette.|Io mi sveglio alle sette./Io si sveglio alle sette./Me sveglio alle sette.|0|Reflexivo: mi sveglio.",
 "e|È le due.|Sono le due./Sono la due./È la due.|0|De las dos en adelante: sono le…",
 "e|Non bevo nunca il caffè.|Non bevo mai il caffè./Non bevo niente il caffè./Bevo mai il caffè.|0|Nunca = mai, con «non» antes del verbo."],
 dlg:`A: Ciao Lauti! Com'è la tua giornata tipo qui? | ¡Hola Lauti! ¿Cómo es tu día típico acá?
T: Mi sveglio alle sette, faccio colazione e comincio a lavorare alle nove. | Me despierto a las siete, desayuno y empiezo a trabajar a las nueve.
A: Lavori da casa? | ¿Trabajás desde casa?
T: Sì, da remoto. Finisco alle sei di sera. | Sí, en remoto. Termino a las seis de la tarde.
A: E dopo cosa fai? | ¿Y después qué hacés?
T: Di solito faccio una passeggiata in paese e poi studio italiano. | Por lo general salgo a caminar por el pueblo y después estudio italiano.
A: Bravo! A che ora ceni? | ¡Bien! ¿A qué hora cenás?
T: Verso le nove. In Argentina si cena anche più tardi! | A eso de las nueve. ¡En Argentina se cena incluso más tarde!
A: Allora ti trovi bene con gli orari calabresi! | ¡Entonces te va bien con los horarios calabreses!
T: Sì, mi trovo benissimo. | Sí, me siento muy a gusto.`,
 role:"Giulia, his friendly 30-year-old friend from Varapodio (tu), curious about his routine and trying to arrange to meet",me:"himself, describing his routine and agreeing times",
 open:["Ciao Lauti! A che ora ti svegli di solito?","¡Hola Lauti! ¿A qué hora te despertás normalmente?","Mi sveglio alle sette.","Me despierto a las siete."],
 sp:`A che ora ti svegli?|Mi sveglio alle sette.
Che ore sono adesso?|Sono le otto.
Quando finisci di lavorare?|Finisco alle sei.
Cosa fai la sera?|Studio e mi riposo.
Ti alzi subito?|Sì, mi alzo subito.
A che ora vai a letto?|Vado a letto a mezzanotte.
Ti trovi bene qui?|Sì, mi trovo bene.
Vai mai al mare?|Ogni tanto.`,
 mis:[["Preguntale la hora a alguien en la calle.","Scusi, che ore sono?"],["Contale a alguien a qué hora empezás y terminás de trabajar.","Comincio alle nove e finisco alle sei."],["Antes de dormir, decí en voz alta tu rutina de mañana en 5 frases.","Domani mi sveglio alle…"]],
 pl:["g|Io ___ sveglio presto.|mi/me/si|0","g|___ le tre.|Sono/È/Ha|0"]},

{id:"u7",t:"Contar tu día",sit:"Lo que hiciste ayer y esta semana",g:"Passato prossimo con avere",tag:"passato prossimo",c:"green",les:["pp"],pron:"doppie",
 can:["Contar qué hiciste ayer o el fin de semana","Usar los participios irregulares frecuentes","Decir «ya» y «todavía no»"],
 ch:`Ieri ho lavorato tutto il giorno.|Ayer trabajé todo el día.
Ho mangiato una pizza buonissima.|Comí una pizza buenísima.
Ho comprato il biglietto online.|Compré el boleto online.
Ho visto un film italiano.|Vi una película italiana.
Ho fatto la spesa stamattina.|Hice las compras esta mañana.
Ho preso il treno delle otto.|Tomé el tren de las ocho.
Ho perso le chiavi.|Perdí las llaves.
Non ho capito bene.|No entendí bien.
Ho dormito male stanotte.|Dormí mal anoche.
Hai già mangiato?|¿Ya comiste?
Non ho ancora finito.|Todavía no terminé.
Ho conosciuto una persona simpatica.|Conocí a una persona simpática.
Abbiamo parlato per un'ora.|Hablamos una hora.
Ho scritto un'email al Comune.|Le escribí un mail a la municipalidad.
Ho letto il giornale al bar.|Leí el diario en el bar.
Cosa hai fatto ieri sera?|¿Qué hiciste ayer a la noche?
La settimana scorsa ho visitato Tropea.|La semana pasada visité Tropea.
Ho chiesto informazioni in stazione.|Pedí información en la estación.
Ho dovuto aspettare mezz'ora.|Tuve que esperar media hora.
Mi ha detto di tornare domani.|Me dijo que volviera mañana.`,
 gx:[
 "g|Ieri ___ mangiato la pasta.|ho/sono/avevo|0|Mangiare usa avere: ho mangiato.",
 "g|Hai ___ il film? (vedere)|visto/veduto/vedato|0|Participio irregular: visto.",
 "g|Ho ___ la spesa. (fare)|fatto/fato/faciuto|0|Fare → fatto.",
 "g|Abbiamo ___ il treno. (prendere)|preso/prenduto/prendato|0|Prendere → preso.",
 "g|Non ho ___ niente. (capire)|capito/capiuto/capisco|0|Verbos -ire → -ito.",
 "g|Lei ha ___ un'email. (scrivere)|scritto/scrivuto/scriveto|0|Scrivere → scritto.",
 "g|Loro ___ lavorato molto.|hanno/sono/ha|0|Loro → hanno.",
 "t|Escribí el participio de «leggere».|letto|Leggere → letto.",
 "t|Escribí en italiano: «Ayer compré pan».|Ieri ho comprato il pane~Ieri ho comprato pane~Ho comprato il pane ieri|Avere + participio: ho comprato.",
 "t|Escribí el participio de «dire».|detto|Dire → detto.",
 "e|Ieri ho vedere un film.|Ieri ho visto un film./Ieri ho veduto un film./Ieri vedo visto un film.|0|Pasado: avere + participio.",
 "e|Non ho già finito. (= todavía no terminé)|Non ho ancora finito./Non ho mai finito ancora./Ancora non ho finito già.|0|«Todavía no» = non… ancora."],
 dlg:`A: Ciao Lauti, cosa hai fatto ieri? | Hola Lauti, ¿qué hiciste ayer?
T: Ieri ho lavorato tutto il giorno, ma la sera ho visto un film italiano. | Ayer trabajé todo el día, pero a la noche vi una película italiana.
A: Ah sì? Che film? | ¿Ah, sí? ¿Qué película?
T: Una commedia. Non ho capito tutto, ma ho riso tanto. | Una comedia. No entendí todo, pero me reí mucho.
A: Bravo! E hai già mangiato la 'nduja? | ¡Bien! ¿Y ya comiste 'nduja?
T: Sì, ho mangiato la 'nduja la settimana scorsa a Tropea. | Sí, comí 'nduja la semana pasada en Tropea.
A: Hai visitato Tropea? Che bello! Come hai viaggiato? | ¿Visitaste Tropea? ¡Qué lindo! ¿Cómo viajaste?
T: Ho preso il treno delle otto. Ho dovuto aspettare mezz'ora a Rosarno! | Tomé el tren de las ocho. ¡Tuve que esperar media hora en Rosarno!
A: Classico! E cosa hai visto? | ¡Clásico! ¿Y qué viste?
T: Ho visto il mare e ho fatto tante foto. | Vi el mar y saqué muchas fotos.`,
 role:"Giulia, his friend (tu), asking what he did recently — each time about a different past event",me:"himself, telling what he did",
 open:["Ciao Lauti! Cosa hai fatto ieri sera?","¡Hola Lauti! ¿Qué hiciste ayer a la noche?","Ieri sera ho visto un film.","Ayer a la noche vi una película."],
 sp:`Cosa hai mangiato ieri?|Ho mangiato la pasta.
Hai dormito bene?|No, ho dormito male.
Cosa hai comprato?|Ho comprato il pane.
Hai visto il mare?|Sì, ho visto il mare.
Hai già finito?|No, non ho ancora finito.
Con chi hai parlato oggi?|Ho parlato con il vicino.
Hai capito?|Sì, ho capito.
Cosa hai fatto stamattina?|Ho fatto la spesa.`,
 mis:[["Contale a alguien qué hiciste ayer en 3 frases.","Ieri ho lavorato, ho mangiato… e ho visto…"],["Preguntale a alguien qué hizo el fin de semana.","Cosa hai fatto nel fine settimana?"],["Antes de dormir, decí en voz alta 5 cosas que hiciste hoy.","Oggi ho…"]],
 pl:["g|Ho ___ la spesa. (fare)|fatto/fato/facciuto|0","g|Hai ___ il film? (vedere)|visto/veduto/vedato|0"]},

{id:"u8",t:"Viajes y salidas",sit:"El fin de semana, excursiones y anécdotas",g:"Passato prossimo con essere",tag:"essere/avere en pasado",c:"salmon",les:["pp"],pron:"cg",
 can:["Contar una salida o un viaje","Elegir entre essere y avere en el pasado","Hacer concordar el participio"],
 ch:`Sono andato a Reggio in treno.|Fui a Reggio en tren.
Sono arrivato in Italia il tredici novembre.|Llegué a Italia el trece de noviembre.
Sono uscito con degli amici.|Salí con unos amigos.
Siamo tornati tardi.|Volvimos tarde.
Sono rimasto a casa tutto il giorno.|Me quedé en casa todo el día.
Sono stato a Scilla domenica.|Estuve en Scilla el domingo.
Mi sono svegliato tardi.|Me desperté tarde.
Ci siamo divertiti tantissimo.|Nos divertimos muchísimo.
Il treno è partito in ritardo.|El tren salió con retraso.
La festa è finita a mezzanotte.|La fiesta terminó a medianoche.
È successo un casino!|¡Pasó un lío!
Sono nato a Córdoba.|Nací en Córdoba.
Sono salito sul treno sbagliato.|Me subí al tren equivocado.
Sono sceso a Rosarno.|Me bajé en Rosarno.
Ti è piaciuto il posto?|¿Te gustó el lugar?
Mi è piaciuto moltissimo.|Me gustó muchísimo.
Siamo andati a cena fuori.|Fuimos a cenar afuera.
Non sono mai stato a Napoli.|Nunca estuve en Nápoles.
Sono venuti a trovarmi.|Vinieron a visitarme.
Mi sono perso in centro.|Me perdí en el centro.`,
 gx:[
 "g|Ieri ___ andato al mare.|sono/ho/è|0|Movimiento (andare) → essere.",
 "g|Giulia è ___ tardi. (arrivare)|arrivata/arrivato/arrivati|0|Con essere el participio concuerda: ella → -a.",
 "g|Noi siamo ___ alle dieci. (uscire)|usciti/uscito/uscite|0|Plural masculino: -i.",
 "g|Ieri ___ dormito poco.|ho/sono/mi sono|0|Dormire usa avere.",
 "g|Le ragazze sono ___. (partire)|partite/partiti/partita|0|Femenino plural: -e.",
 "g|Mi ___ svegliato presto.|sono/ho/è|0|Los reflexivos usan essere.",
 "g|Sono ___ a casa. (rimanere)|rimasto/rimanuto/rimaso|0|Rimanere → rimasto.",
 "t|Escribí en italiano: «Fui a Palmi» (sos hombre).|Sono andato a Palmi|Andare → essere: sono andato.",
 "t|Escribí en italiano: «Ella llegó ayer».|È arrivata ieri~Lei è arrivata ieri~Ieri è arrivata|Concordancia: arrivata.",
 "t|Escribí el participio de «venire».|venuto|Venire → venuto.",
 "e|Ho andato al cinema.|Sono andato al cinema./Ho andata al cinema./Sono andare al cinema.|0|Andare usa essere.",
 "e|Maria è arrivato.|Maria è arrivata./Maria ha arrivato./Maria è arrivati.|0|Concordancia: arrivata."],
 dlg:`A: Allora, com'è andato il fine settimana? | Bueno, ¿cómo te fue el fin de semana?
T: Benissimo! Sabato sono andato a Scilla con dei ragazzi del paese. | ¡Muy bien! El sábado fui a Scilla con unos chicos del pueblo.
A: Che bello! Siete andati in macchina? | ¡Qué lindo! ¿Fueron en auto?
T: No, in treno. Ma sono salito sul treno sbagliato! | No, en tren. ¡Pero me subí al tren equivocado!
A: No! E cosa è successo? | ¡No! ¿Y qué pasó?
T: Sono sceso a Rosarno e ho preso quello giusto. Siamo arrivati alle undici. | Me bajé en Rosarno y tomé el correcto. Llegamos a las once.
A: E poi? | ¿Y después?
T: Siamo andati a cena fuori e ci siamo divertiti tantissimo. | Fuimos a cenar afuera y nos divertimos muchísimo.
A: A che ora siete tornati? | ¿A qué hora volvieron?
T: Siamo tornati all'una. Domenica sono rimasto a casa a riposare! | Volvimos a la una. ¡El domingo me quedé en casa descansando!`,
 role:"Giulia, his friend (tu), asking about a trip, outing or anecdote — new places each time",me:"himself, telling a past story",
 open:["Ciao! Dove sei andato nel fine settimana?","¡Hola! ¿Adónde fuiste el fin de semana?","Sono andato a Scilla.","Fui a Scilla."],
 sp:`Dove sei andato ieri?|Sono andato in centro.
Quando sei arrivato in Italia?|Sono arrivato il tredici novembre.
A che ora sei tornato?|Sono tornato a mezzanotte.
Sei mai stato a Napoli?|No, non sono mai stato a Napoli.
Ti sei divertito?|Sì, mi sono divertito tanto.
Dove sei nato?|Sono nato a Córdoba.
Sei uscito ieri sera?|No, sono rimasto a casa.
Ti è piaciuto?|Sì, mi è piaciuto molto.`,
 mis:[["Contale a alguien adónde fuiste esta semana.","Questa settimana sono andato a…"],["Preguntale a alguien si alguna vez estuvo en Argentina.","Sei mai stato in Argentina?"],["Contá en voz alta tu llegada a Italia en 5 frases.","Sono arrivato a Lamezia, poi sono andato…"]],
 pl:["g|Giulia è ___ tardi. (arrivare)|arrivata/arrivato/arrivati|0","g|Ieri ___ andato al mare.|sono/ho/sto|0"]},

{id:"u9",t:"Gente y gustos",sit:"Familia, vecinos y lo que te gusta",g:"Piacere, mancare y posesivos",tag:"piacere",c:"lime",les:["piac"],pron:"gli",
 can:["Hablar de tu familia y de la gente del pueblo","Decir qué te gusta, qué no y qué extrañás","Usar mio, tuo, suo… con y sin artículo"],
 rx:`<p><b>Posesivos:</b> en italiano llevan artículo: <i>il mio telefono, la mia casa, i miei amici, le mie chiavi</i>.</p>
<p><b>Excepción:</b> familiares en singular, sin artículo: <i>mio fratello, mia madre, suo padre</i>. En plural vuelve el artículo: <i>i miei fratelli</i>. Y siempre con <i>loro</i>: <i>il loro figlio</i>.</p>
<div class="tbl-wrap"><table><tr><th></th><th>masc.</th><th>fem.</th><th>masc. pl.</th><th>fem. pl.</th></tr><tr><td>mi</td><td>il mio</td><td>la mia</td><td>i miei</td><td>le mie</td></tr><tr><td>tu</td><td>il tuo</td><td>la tua</td><td>i tuoi</td><td>le tue</td></tr><tr><td>su (de él, de ella, de usted)</td><td>il suo</td><td>la sua</td><td>i suoi</td><td>le sue</td></tr><tr><td>nuestro</td><td>il nostro</td><td>la nostra</td><td>i nostri</td><td>le nostre</td></tr></table></div>`,
 ch:`Ho un fratello, Fabio.|Tengo un hermano, Fabio.
La mia famiglia è in Argentina.|Mi familia está en Argentina.
Mi piace molto il mare.|Me gusta mucho el mar.
Mi piacciono le persone di qui.|Me gustan las personas de acá.
Non mi piace il freddo.|No me gusta el frío.
Ti piace la cucina calabrese?|¿Te gusta la cocina calabresa?
A me piace di più la pasta.|A mí me gusta más la pasta.
Mi manca la mia famiglia.|Extraño a mi familia.
Mi mancano gli amici.|Extraño a los amigos.
Com'è la tua famiglia?|¿Cómo es tu familia?
Il suo cane è simpaticissimo.|Su perro es simpatiquísimo.
Questa è la mia vicina, Rosa.|Esta es mi vecina, Rosa.
È alto, moro e molto simpatico.|Es alto, morocho y muy simpático.
Ha gli occhi verdi.|Tiene los ojos verdes.
Andiamo d'accordo.|Nos llevamos bien.
Siamo molto legati.|Somos muy unidos.
I nostri vicini sono gentili.|Nuestros vecinos son amables.
Mi interessa la storia del paese.|Me interesa la historia del pueblo.
Mi serve una mano.|Necesito una mano.
Ci tengo molto.|Me importa mucho.`,
 gx:[
 "g|Mi ___ la pizza.|piace/piacciono/piaccio|0|Una sola cosa: piace.",
 "g|Mi ___ i gelati.|piacciono/piace/piaci|0|Varias cosas: piacciono.",
 "g|A Giulia ___ piace ballare.|le/gli/la|0|A ella: le piace.",
 "g|A Marco ___ piace il calcio.|gli/le/lo|0|A él: gli piace.",
 "g|___ fratello si chiama Fabio.|Mio/Il mio/La mia|0|Familiar en singular: sin artículo.",
 "g|___ genitori sono in Argentina.|I miei/Miei/Le mie|0|En plural vuelve el artículo: i miei.",
 "g|___ famiglia è grande.|La mia/Mia/Il mio|0|Famiglia lleva artículo: la mia famiglia.",
 "g|Mi ___ i miei amici.|mancano/manca/manco|0|Mancare funciona como piacere.",
 "t|Escribí en italiano: «Me gusta el mar».|Mi piace il mare|Lo que gusta es el sujeto: mi piace il mare.",
 "t|Escribí en italiano: «Nuestros vecinos son amables».|I nostri vicini sono gentili|Posesivo con artículo: i nostri.",
 "e|Io piaccio la pasta.|Mi piace la pasta./Io piace la pasta./Mi piaccio la pasta.|0|Mi piace + lo que gusta.",
 "e|Il mio sorella vive a Roma.|Mia sorella vive a Roma./La mia sorella vive a Roma./Il mia sorella vive a Roma.|0|Familiar en singular: mia sorella."],
 dlg:`A: Lauti, hai fratelli? | Lauti, ¿tenés hermanos?
T: Sì, ho un fratello, Fabio. Anche lui ha la cittadinanza italiana. | Sí, tengo un hermano, Fabio. Él también tiene la ciudadanía italiana.
A: Che bello! E la tua famiglia è in Argentina? | ¡Qué lindo! ¿Y tu familia está en Argentina?
T: Sì, la mia famiglia è a Córdoba. Mi manca un po'. | Sí, mi familia está en Córdoba. La extraño un poco.
A: Ti capisco. E qui ti piace? | Te entiendo. ¿Y acá te gusta?
T: Sì, mi piacciono molto le persone di qui. Sono gentilissime. | Sí, me gustan mucho las personas de acá. Son amabilísimas.
A: E la cucina calabrese? Ti piace il peperoncino? | ¿Y la cocina calabresa? ¿Te gusta el ají?
T: Mi piace, ma non troppo piccante! | Me gusta, ¡pero no demasiado picante!
A: Allora domenica vieni a pranzo da noi. Mia nonna cucina benissimo. | Entonces el domingo venís a almorzar a casa. Mi abuela cocina buenísimo.
T: Volentieri! Ci tengo molto a conoscere la tua famiglia. | ¡Con gusto! Me importa mucho conocer a tu familia.`,
 role:"Giulia, his friend (tu), talking about families, people in town, likes and dislikes",me:"himself",
 open:["Ciao Lauti! Com'è la tua famiglia?","¡Hola Lauti! ¿Cómo es tu familia?","La mia famiglia è in Argentina.","Mi familia está en Argentina."],
 sp:`Ti piace il mare?|Sì, mi piace molto.
Ti piacciono gli spaghetti?|Sì, mi piacciono.
Hai fratelli?|Sì, ho un fratello.
Dov'è la tua famiglia?|La mia famiglia è in Argentina.
Cosa ti manca dell'Argentina?|Mi manca la mia famiglia.
Com'è il tuo vicino?|È molto gentile.
Cosa non ti piace?|Non mi piace il freddo.
Ti interessa la storia?|Sì, mi interessa molto.`,
 mis:[["Decile a alguien algo que te gusta de Calabria.","Mi piace molto…"],["Preguntale a un vecino por su familia.","Com'è la sua famiglia?"],["Describí en voz alta a una persona del pueblo: aspecto y carácter.","È alto, simpatico e…"]],
 pl:["g|Mi ___ i gelati.|piacciono/piace/piaccio|0","g|___ fratello si chiama Fabio.|Mio/Il mio/Mia|0"]},

{id:"u10",t:"Planes",sit:"Fiestas, invitaciones y proyectos",g:"Futuro, ci y ne",tag:"futuro",c:"yellow",les:["fut","cine"],pron:"sc",
 can:["Hacer planes y proponer salidas","Hablar de las fiestas y del futuro","Usar ci (allí) y ne (de eso)"],
 ch:`Domani andrò a Reggio.|Mañana voy a ir a Reggio.
Il fine settimana prossimo visiterò Tropea.|El próximo fin de semana voy a visitar Tropea.
Cosa farai a Natale?|¿Qué vas a hacer en Navidad?
Passerò il Natale qui.|Voy a pasar Navidad acá.
Se fa bel tempo, andremo al mare.|Si hace buen tiempo, vamos a ir al mar.
Ti chiamerò stasera.|Te voy a llamar esta noche.
Ci vediamo sabato?|¿Nos vemos el sábado?
Ci vado domani.|Voy mañana (ahí).
Ci penso io.|Me encargo yo.
Sto per uscire.|Estoy por salir.
Che programmi hai?|¿Qué planes tenés?
Hai impegni stasera?|¿Tenés algo esta noche?
Sarò libero dopo le sei.|Voy a estar libre después de las seis.
Forse verrò anch'io.|Quizás vaya yo también.
Ne parliamo domani.|Lo hablamos mañana.
Ne vorrei due.|Quisiera dos (de eso).
Dipende dal tempo.|Depende del clima.
Organizziamo una cena?|¿Organizamos una cena?
Sarà bellissimo.|Va a ser hermoso.
Non vedo l'ora!|¡No veo la hora!`,
 gx:[
 "g|Domani io ___ a Reggio. (andare)|andrò/anderò/andarò|0|Andare: andrò (irregular).",
 "g|Tu cosa ___ sabato? (fare)|farai/farei/fai|0|Fare: farai.",
 "g|Noi ___ il treno delle otto. (prendere)|prenderemo/prendremo/prenderanno|0|-ere: prenderemo.",
 "g|Loro ___ a cena da noi. (venire)|verranno/veniranno/vengranno|0|Venire: verranno.",
 "g|Io ___ libero dopo le sei. (essere)|sarò/essarò/sono stato|0|Essere: sarò.",
 "g|Vai a Palmi? Sì, ___ vado domani.|ci/ne/lo|0|Ci = a ese lugar.",
 "g|Quanti caffè prendi? ___ prendo due.|Ne/Ci/Li|0|Ne = de eso (cantidad).",
 "g|Io ti ___ domani, va bene? (chiamare)|chiamerò/chiamarò/chiamerei|0|-are → -erò.",
 "t|Escribí el futuro de «avere», io.|avrò|Avere: avrò.",
 "t|Escribí en italiano en futuro: «Mañana voy a estudiar».|Domani studierò|-are → -erò: studierò.",
 "e|Domani andarò al mare.|Domani andrò al mare./Domani anderò al mare./Domani andrei al mare.|0|Andare → andrò.",
 "e|Vai al bar? Sì, ne vado.|Sì, ci vado./Sì, lo vado./Sì, vado ci.|0|Lugar: ci vado."],
 dlg:`A: Lauti, cosa farai a Natale? | Lauti, ¿qué vas a hacer en Navidad?
T: Passerò il Natale qui. È il mio primo Natale in Italia! | Voy a pasar Navidad acá. ¡Es mi primera Navidad en Italia!
A: Allora devi venire da noi la vigilia. Faremo il pesce. | Entonces tenés que venir a casa en Nochebuena. Vamos a hacer pescado.
T: Volentieri! Cosa posso portare? | ¡Con gusto! ¿Qué puedo llevar?
A: Niente! Anzi, porta un dolce argentino. | ¡Nada! Bueno, traé un postre argentino.
T: Allora farò gli alfajores. Ne preparerò una ventina. | Entonces voy a hacer alfajores. Voy a preparar unos veinte.
A: Che buono! E a Capodanno? | ¡Qué rico! ¿Y en Año Nuevo?
T: Non lo so ancora. Forse andrò a Reggio con degli amici. | No sé todavía. Quizás vaya a Reggio con unos amigos.
A: Se vuoi, ci andiamo insieme. | Si querés, vamos juntos.
T: Perfetto, ne parliamo dopo. Non vedo l'ora! | Perfecto, lo hablamos después. ¡No veo la hora!`,
 role:"Giulia, his friend (tu), making plans together for the coming days and the holidays",me:"himself, making plans",
 open:["Allora Lauti, che programmi hai per il fine settimana?","Bueno Lauti, ¿qué planes tenés para el fin de semana?","Sabato andrò a Tropea.","El sábado voy a ir a Tropea."],
 sp:`Cosa farai domani?|Domani lavorerò.
Dove passerai il Natale?|Resterò qui.
Vai al mercato?|Sì, ci vado domani.
Quante pizze vuoi?|Ne voglio due.
Sarai libero stasera?|Sì, sarò libero dopo le sei.
Chi verrà alla cena?|Verranno i miei amici.
Cosa farai se piove?|Resterò a casa.
Quando ci vediamo?|Ci vediamo sabato.`,
 mis:[["Proponele un plan a alguien para el fin de semana.","Sabato andiamo a…?"],["Contale a alguien qué vas a hacer en Navidad.","A Natale resterò qui e…"],["Usá «ci vado» o «ne vorrei» en un negocio o en una charla.","Ne vorrei due, grazie."]],
 pl:["g|Domani io ___ a Reggio. (andare)|andrò/anderò/vado a andare|0","g|Vai a Palmi? Sì, ___ vado.|ci/ne/lo|0"]},

{id:"u11",t:"Salud y problemas",sit:"Médico, farmacia, reparaciones e imprevistos",g:"Imperativo y pronombres (lo, la, gli, le)",tag:"pronombres",c:"coral",les:["pron2"],pron:"z",
 can:["Explicar qué te pasa en el médico o la farmacia","Resolver un imprevisto (algo roto, algo perdido)","Dar indicaciones y usar lo, la, li, gli, le"],
 rx:`<p><b>Imperativo:</b> con <i>tu</i>, los verbos -are terminan en <b>-a</b> (parla, aspetta) y los -ere/-ire en <b>-i</b> (prendi, senti). Con <i>Lei</i> se invierte: <b>parli, aspetti, prenda, senta</b>.</p>
<p><b>Negativo con tu:</b> non + infinitivo → <i>Non parlare! Non ti preoccupare!</i></p>
<p><b>Pronombres:</b> lo (a él, eso), la (a ella), li / le (plural) reemplazan al objeto: <i>Il telefono? <b>Lo</b> riparo.</i> «A él» = <b>gli</b>, «a ella / a usted» = <b>le</b>: <i><b>Gli</b> scrivo, <b>Le</b> telefono.</i></p>
<p>En pasado, lo y la se apostrofan: <i>l'ho visto</i>.</p>`,
 ch:`Non mi sento bene.|No me siento bien.
Ho mal di testa.|Me duele la cabeza.
Mi fa male la gola.|Me duele la garganta.
Ho la febbre da ieri.|Tengo fiebre desde ayer.
Ho bisogno di un medico.|Necesito un médico.
È grave?|¿Es grave?
Ogni quanto devo prenderlo?|¿Cada cuánto lo tengo que tomar?
Mi può fare la ricetta?|¿Me puede hacer la receta?
Prenda queste pastiglie due volte al giorno.|Tome estas pastillas dos veces al día.
Avete qualcosa per la tosse?|¿Tienen algo para la tos?
Mi aiuti, per favore!|¡Ayúdeme, por favor!
Chiami un'ambulanza!|¡Llame a una ambulancia!
Mi si è rotto il telefono.|Se me rompió el teléfono.
Lo può riparare?|¿Lo puede arreglar?
Quando lo posso ritirare?|¿Cuándo lo puedo retirar?
Le chiavi? Le ho perse.|¿Las llaves? Las perdí.
Gli scrivo subito.|Le escribo enseguida (a él).
Le telefono domani.|La llamo mañana (a ella o a usted).
Aspetta un attimo!|¡Esperá un momento!
Non ti preoccupare.|No te preocupes.`,
 gx:[
 "g|(tu) ___ qui! (venire)|Vieni/Venga/Venite|0|Imperativo con tu: vieni.",
 "g|(Lei) ___, prego. (entrare)|Entri/Entra/Entrate|0|Con Lei, -are → -i: entri.",
 "g|(tu) ___ la porta! (chiudere)|Chiudi/Chiuda/Chiudere|0|Con tu, -ere → -i: chiudi.",
 "g|(tu) Non ___! (parlare)|parlare/parli/parla|0|Negativo con tu: non + infinitivo.",
 "g|Il libro? ___ leggo stasera.|Lo/La/Li|0|Masculino singular: lo.",
 "g|La pizza? ___ mangio subito.|La/Lo/Le|0|Femenino singular: la.",
 "g|I biglietti? ___ ho comprati.|Li/Le/Lo|0|Masculino plural: li (y el participio concuerda).",
 "g|A Marco? ___ scrivo domani.|Gli/Le/Lo|0|«A él» = gli.",
 "g|A Giulia? ___ telefono stasera.|Le/Gli/La|0|«A ella» = le.",
 "t|Escribí en italiano: «Me duele la cabeza».|Ho mal di testa~Mi fa male la testa|Ho mal di… / mi fa male…",
 "t|Escribí el imperativo con tu de «mangiare».|mangia|-are → -a: mangia.",
 "e|Il telefono? Le ho rotto.|L'ho rotto./Lo ho rotti./Gli ho rotto.|0|Lo + ho = l'ho.",
 "e|Non ti preoccupi! (a un amigo)|Non ti preoccupare!/Non preoccupa!/Non ti preoccupa!|0|Negativo con tu: non + infinitivo."],
 dlg:`A: Buongiorno, si accomodi. Cosa si sente? | Buen día, póngase cómodo. ¿Qué siente?
T: Buongiorno dottore. Non mi sento bene: ho mal di testa e mi fa male la gola. | Buen día, doctor. No me siento bien: me duele la cabeza y me duele la garganta.
A: Da quanto tempo? Ha la febbre? | ¿Desde hace cuánto? ¿Tiene fiebre?
T: Da ieri. Ieri sera avevo trentotto. | Desde ayer. Ayer a la noche tenía treinta y ocho.
A: Apra la bocca... Sì, la gola è un po' rossa. Niente di grave. | Abra la boca... Sí, la garganta está un poco roja. Nada grave.
T: Meno male. Mi può fare la ricetta? | Menos mal. ¿Me puede hacer la receta?
A: Certo. Prenda queste pastiglie due volte al giorno, dopo i pasti. | Claro. Tome estas pastillas dos veces al día, después de las comidas.
T: Per quanti giorni? | ¿Por cuántos días?
A: Per cinque giorni. E beva molta acqua. | Por cinco días. Y tome mucha agua.
T: Grazie mille, dottore. | Muchas gracias, doctor.`,
 reg:"auto",role:"a family doctor in Varapodio (Lei), a young pharmacist (tu), or a young phone repair shop employee (tu) — vary the situation",me:"someone with a health problem or something broken",
 open:["Buongiorno, si accomodi. Mi dica, cosa si sente?","Buen día, póngase cómodo. Dígame, ¿qué siente?","Non mi sento bene, ho mal di testa.","No me siento bien, me duele la cabeza."],
 sp:`Come ti senti?|Non mi sento bene.
Cosa ti fa male?|Mi fa male la gola.
Hai la febbre?|Sì, ho la febbre da ieri.
Hai preso le medicine?|Sì, le ho prese.
Dove sono le chiavi?|Le ho perse!
Hai scritto a Marco?|Sì, gli ho scritto.
Il telefono funziona?|No, si è rotto.
Cosa devo fare?|Bevi molta acqua.`,
 mis:[["Entrá a una farmacia y preguntá por algo para el resfrío o la tos.","Avete qualcosa per il raffreddore?"],["Usá el imperativo con un amigo: pedile que te espere o que venga.","Aspettami! / Vieni qui!"],["Practicá en voz alta cómo pedir ayuda en una emergencia, para saberlo de memoria.","Mi aiuti, per favore! Chiami un'ambulanza!"]],
 pl:["g|La pizza? ___ mangio subito.|La/Lo/Le|0","g|(Lei) ___, prego. (entrare)|Entri/Entra/Entrate|0"]},

{id:"u12",t:"Opinar y conversar",sit:"Charlas largas, opiniones y recuerdos",g:"Condicional e imperfetto",tag:"imperfetto/condicional",c:"stone",les:["imp","fut"],pron:"acc",
 can:["Dar tu opinión y estar o no de acuerdo","Contar cómo era tu vida antes","Pedir, aconsejar y desear con el condicional"],
 rx:`<p><b>Condicional</b> (sería, podría, me gustaría): se arma como el futuro pero con <b>-ei</b>: <i>parlerei, andrei, vorrei, potrei, dovrei, sarei, mi piacerebbe</i>. Sirve para pedir con cortesía (<i>Potresti aiutarmi?</i>), aconsejar (<i>Dovresti provare</i>) y desear (<i>Mi piacerebbe restare</i>).</p>
<p><b>Imperfetto vs passato prossimo:</b> el imperfetto describe el fondo o lo habitual (<i>Da piccolo <b>vivevo</b> a Córdoba</i>, <i>Mentre <b>camminavo</b>…</i>); el passato prossimo cuenta el hecho puntual (<i>…<b>ho visto</b> Marco</i>). Igual que «caminaba» / «vi» en español.</p>`,
 ch:`Secondo me, è una buona idea.|Para mí, es una buena idea.
Sono d'accordo con te.|Estoy de acuerdo con vos.
Non sono d'accordo, perché…|No estoy de acuerdo, porque…
Dipende dal punto di vista.|Depende del punto de vista.
Mi piacerebbe vivere qui.|Me gustaría vivir acá.
Potresti aiutarmi?|¿Podrías ayudarme?
Dovresti provare la 'nduja.|Deberías probar la 'nduja.
Al posto tuo, andrei.|En tu lugar, iría.
Quando ero piccolo, vivevo a Córdoba.|Cuando era chico, vivía en Córdoba.
All'inizio era difficile, adesso va meglio.|Al principio era difícil, ahora va mejor.
Da piccolo andavo spesso dai nonni.|De chico iba seguido a lo de mis abuelos.
Mentre camminavo, ho visto un amico.|Mientras caminaba, vi a un amigo.
Da una parte… dall'altra…|Por un lado… por el otro…
Comunque, è vero che…|De todos modos, es verdad que…
Insomma, mi trovo bene.|En resumen, estoy a gusto.
Che ne pensi?|¿Qué opinás?
Hai ragione.|Tenés razón.
Non ne sono sicuro.|No estoy seguro.
Sarebbe meglio aspettare.|Sería mejor esperar.
Vorrei restare più a lungo.|Quisiera quedarme más tiempo.`,
 gx:[
 "g|Mi ___ vivere al mare. (piacere, condicional)|piacerebbe/piacerà/piacerei|0|Condicional: mi piacerebbe.",
 "g|___ aiutarmi? (potere, tu)|Potresti/Potrai/Potrei|0|Condicional con tu: potresti.",
 "g|Al posto tuo, io ___. (andare)|andrei/anderei/andrò|0|Andare: andrei.",
 "g|Quando ero piccolo, ___ a Córdoba. (vivere)|vivevo/ho vissuto/vivo|0|Situación de fondo en el pasado: imperfetto.",
 "g|Mentre ___, ha squillato il telefono. (mangiare)|mangiavo/ho mangiato/mangio|0|Acción de fondo: imperfetto.",
 "g|Ieri ___ un amico in piazza. (incontrare)|ho incontrato/incontravo/incontrerei|0|Hecho puntual: passato prossimo.",
 "g|Da bambino ___ sempre al mare. (andare)|andavo/sono andato/andrò|0|Costumbre en el pasado: imperfetto.",
 "g|Hai ___, è tardi.|ragione/razione/ragioni|0|Tener razón = avere ragione.",
 "t|Escribí el imperfetto de «essere», io.|ero|Essere: ero.",
 "t|Escribí el condicional de «volere», io.|vorrei|Volere: vorrei.",
 "e|Io andarei volentieri.|Io andrei volentieri./Io anderei volentieri./Io andrebbe volentieri.|0|Andare → andrei.",
 "e|Ieri camminavo e ho vedevo Marco.|Ieri camminavo e ho visto Marco./Ieri caminavo e visto Marco./Ieri camminavo e vedendo Marco.|0|Fondo (camminavo) + hecho puntual (ho visto)."],
 dlg:`A: Allora Lauti, dopo un mese qui, che ne pensi della Calabria? | Bueno Lauti, después de un mes acá, ¿qué opinás de Calabria?
T: Secondo me è bellissima. All'inizio era difficile, ma adesso va meglio. | Para mí es hermosa. Al principio era difícil, pero ahora va mejor.
A: Cos'era difficile? | ¿Qué era difícil?
T: La lingua, la burocrazia... e gli orari dei negozi! | El idioma, la burocracia... ¡y los horarios de los negocios!
A: Hai ragione, qui tutto chiude il pomeriggio! | ¡Tenés razón, acá todo cierra a la tarde!
T: Da una parte è strano, dall'altra è bello: la gente si riposa. | Por un lado es raro, por el otro es lindo: la gente descansa.
A: E ti piacerebbe restare? | ¿Y te gustaría quedarte?
T: Mi piacerebbe restare più a lungo, ma dipende dal lavoro. | Me gustaría quedarme más tiempo, pero depende del trabajo.
A: Secondo me dovresti provare! | ¡Para mí deberías intentarlo!
T: Ci penserò. Insomma, mi trovo benissimo qui. | Lo voy a pensar. En resumen, estoy muy a gusto acá.`,
 role:"Giulia, his friend (tu), asking his opinion on a different topic each time (life in a small town, food, bureaucracy, travel, differences between Italy and Argentina)",me:"himself, giving opinions and comparing",
 open:["Lauti, secondo te, com'è la vita in un paese piccolo?","Lauti, según vos, ¿cómo es la vida en un pueblo chico?","Secondo me è tranquilla, ma…","Para mí es tranquila, pero…"],
 sp:`Che ne pensi della pizza calabrese?|Secondo me è buonissima.
Ti piacerebbe vivere qui?|Sì, mi piacerebbe.
Cosa facevi da piccolo?|Giocavo con gli amici.
Sei d'accordo?|Sì, sono d'accordo.
Cosa mi consigli?|Dovresti provare la 'nduja.
Com'era il viaggio?|Era lungo ma bello.
Cosa faresti al posto mio?|Al posto tuo, aspetterei.
Com'è l'Argentina rispetto all'Italia?|Da una parte è simile, dall'altra è diversa.`,
 mis:[["Dale tu opinión a alguien sobre algo del pueblo.","Secondo me…"],["Contale a alguien cómo era tu vida en Córdoba, con el imperfetto.","A Córdoba lavoravo e…"],["Usá «mi piacerebbe» para proponer o desear algo.","Mi piacerebbe…"]],
 pl:["g|Mi ___ vivere al mare.|piacerebbe/piacerà/piaceva|0","g|Quando ero piccolo, ___ a Córdoba.|vivevo/ho vivuto/vivrò|0"]}
];
