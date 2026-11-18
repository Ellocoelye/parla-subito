/* ============================== CONTENT ============================== */
const GROUPS = {
  base:"Supervivencia", yo:"Presentarte", bar:"Bar y comida", negozi:"Compras y plata",
  comune:"Comune y trámites", casa:"Casa", viaggio:"Transporte", salute:"Salud",
  gente:"Vecinos y charla", flu:"Muletillas para fluir", strut:"Estructuras clave"
};
/* Format: italiano | español | nota opcional. Order = order of introduction. */
const DECK_TXT = `
#base
Scusi, non ho capito. | Disculpe, no entendí.
Può ripetere, per favore? | ¿Puede repetir, por favor?
Può parlare più lentamente? | ¿Puede hablar más despacio?
Sto imparando l'italiano. | Estoy aprendiendo italiano. | Decilo al empezar cualquier charla: la gente se vuelve más paciente.
Mi corregga, per favore. | Corríjame, por favor.
Come si dice "llave" in italiano? | ¿Cómo se dice "llave" en italiano? | Cambiá la palabra entre comillas por la que te falte. (Llave = la chiave.)
Cosa vuol dire? | ¿Qué quiere decir?
Me lo può scrivere? | ¿Me lo puede escribir?
Non lo so. | No lo sé.
Va bene. | Está bien. / Dale.
#yo
Mi chiamo Lautaro. | Me llamo Lautaro.
Sono argentino, di Córdoba. | Soy argentino, de Córdoba.
Sono qui per la cittadinanza. | Estoy acá por la ciudadanía.
Il mio bisnonno era di qui. | Mi bisabuelo era de acá. | "Era" es imperfetto, igual que en español.
Abito a Varapodio da poco. | Vivo en Varapodio desde hace poco. | "Da" + tiempo = desde hace.
Lavoro da remoto. | Trabajo en remoto.
Mi occupo di marketing. | Me dedico al marketing. | "Occuparsi di" es la forma natural de decir a qué te dedicás.
Resto almeno tre mesi. | Me quedo al menos tres meses.
Piacere! | ¡Encantado!
E Lei, di dov'è? | ¿Y usted, de dónde es?
#base
Certo! | ¡Claro!
Non c'è problema. | No hay problema.
Permesso. | Permiso. | Para pasar entre la gente o entrar a una casa.
Grazie mille. | Muchas gracias.
Prego. | De nada. / Adelante. | La palabra comodín: "de nada", "pase", "¿qué le sirvo?".
Aspetti un attimo. | Espere un momento.
Ho bisogno di aiuto. | Necesito ayuda.
C'è una farmacia qui vicino? | ¿Hay una farmacia acá cerca?
Dov'è il bagno? | ¿Dónde está el baño?
#bar
Un caffè, per favore. | Un café, por favor. | "Un caffè" es un expreso. Si querés uno largo: "un caffè lungo" o "un americano".
Vorrei un cornetto alla crema. | Quería una medialuna con crema. | "Vorrei" es la forma amable de pedir: usala siempre.
Per me un cappuccino. | Para mí un capuchino.
Da portare via. | Para llevar.
Quant'è? | ¿Cuánto es?
Pago prima alla cassa? | ¿Pago primero en la caja?
Il conto, per favore. | La cuenta, por favor.
Cosa mi consiglia? | ¿Qué me recomienda?
Era buonissimo, complimenti! | ¡Estaba riquísimo, felicitaciones!
Avete un tavolo per due? | ¿Tienen una mesa para dos?
Senza cipolla, per favore. | Sin cebolla, por favor.
Un bicchiere di vino rosso. | Una copa de vino tinto.
A che ora aprite? | ¿A qué hora abren?
A che ora chiudete? | ¿A qué hora cierran?
#negozi
Quanto costa? | ¿Cuánto cuesta?
Quanto costano? | ¿Cuánto cuestan?
Posso pagare con la carta? | ¿Puedo pagar con tarjeta?
Pago in contanti. | Pago en efectivo.
Non ho spiccioli. | No tengo monedas / billetes chicos.
Ho solo una banconota da cinquanta. | Solo tengo un billete de cincuenta.
Mi dà mezzo chilo di pomodori? | ¿Me da medio kilo de tomates?
Due etti di prosciutto, per favore. | 200 gramos de jamón crudo, por favor. | Un etto = 100 g. Se usa todo el tiempo en almacenes y carnicerías.
Avete del pane? | ¿Tienen pan?
Basta così, grazie. | Nada más, gracias. | Respuesta a "Altro?" (¿algo más?).
Dove trovo il latte? | ¿Dónde encuentro la leche?
Mi serve un sacchetto. | Necesito una bolsa.
È troppo caro. | Es demasiado caro.
Lo prendo. | Me lo llevo.
#comune
Ho un appuntamento all'anagrafe. | Tengo turno en la oficina de anagrafe.
Vorrei richiedere la residenza. | Quisiera pedir la residencia.
Quali documenti servono? | ¿Qué documentos hacen falta?
Ho portato tutti i documenti. | Traje todos los documentos.
Mi manca un documento. | Me falta un documento. | "Mancare" funciona como "faltar": lo que falta es el sujeto.
Ecco il passaporto. | Acá tiene el pasaporte. | "Ecco" = acá está / acá tiene. Muy útil al entregar algo.
Devo prendere un appuntamento? | ¿Tengo que sacar turno?
Quando devo tornare? | ¿Cuándo tengo que volver?
Quanto tempo ci vuole? | ¿Cuánto tiempo lleva?
Dove devo firmare? | ¿Dónde tengo que firmar?
Mi serve una copia? | ¿Necesito una copia?
Quando passa il vigile per il controllo? | ¿Cuándo pasa el vigile para el control?
Il mio nome è sul campanello. | Mi nombre está en el timbre.
A che punto è la mia pratica? | ¿En qué estado está mi trámite? | "La pratica" = el trámite / el expediente.
Ho ricevuto una lettera. | Recibí una carta. | Ojo: "carta" en italiano es papel. La carta que se envía es "lettera".
Può controllare, per favore? | ¿Puede verificar, por favor?
#casa
Cerco una casa in affitto. | Busco una casa en alquiler.
Quant'è l'affitto al mese? | ¿Cuánto es el alquiler por mes?
Le bollette sono incluse? | ¿Los servicios están incluidos?
Non funziona il riscaldamento. | No funciona la calefacción.
Non c'è l'acqua calda. | No hay agua caliente. | "Caldo" = caliente. No es "caldo" de sopa (eso es "brodo").
Dove si butta la plastica? | ¿Dónde se tira el plástico?
Che giorno ritirano l'umido? | ¿Qué día recogen los residuos orgánicos?
Mi presta un cacciavite? | ¿Me presta un destornillador?
La chiave non gira. | La llave no gira.
#viaggio
Dov'è la fermata dell'autobus? | ¿Dónde está la parada del colectivo?
A che ora parte il prossimo autobus? | ¿A qué hora sale el próximo colectivo?
Un biglietto per Gioia Tauro, per favore. | Un boleto a Gioia Tauro, por favor.
Andata e ritorno. | Ida y vuelta.
Da quale binario parte? | ¿De qué andén sale?
Il treno è in ritardo? | ¿El tren está demorado?
Devo cambiare treno? | ¿Tengo que cambiar de tren?
Mi avvisa quando arriviamo? | ¿Me avisa cuando lleguemos?
Scendo alla prossima. | Me bajo en la próxima.
Ho perso l'autobus. | Perdí el colectivo.
#salute
Non mi sento bene. | No me siento bien.
Mi fa male la testa. | Me duele la cabeza.
Ho mal di gola. | Me duele la garganta.
Ho la febbre. | Tengo fiebre.
Ho bisogno di un medico. | Necesito un médico.
Ha qualcosa per il raffreddore? | ¿Tiene algo para el resfrío?
Dov'è la farmacia di turno? | ¿Dónde está la farmacia de turno?
#gente
Buongiorno! Come va? | ¡Buen día! ¿Cómo va?
Tutto bene, grazie. E Lei? | Todo bien, gracias. ¿Y usted?
Che bella giornata! | ¡Qué lindo día!
Oggi fa freddo. | Hoy hace frío.
Sono il nuovo vicino. | Soy el vecino nuevo.
Da quanto tempo abita qui? | ¿Hace cuánto vive acá?
Mi piace molto il paese. | Me gusta mucho el pueblo. | "Il paese" = el pueblo (y también el país).
La gente qui è gentilissima. | La gente acá es amabilísima.
Cosa mi consiglia di vedere qui vicino? | ¿Qué me recomienda ver por acá?
Che fai di bello? | ¿Qué contás? / ¿Qué andás haciendo?
Ti va un caffè? | ¿Querés (tomar) un café?
Volentieri! | ¡Con gusto!
Che peccato! | ¡Qué lástima!
Davvero? | ¿En serio?
Hai ragione. | Tenés razón.
Sono d'accordo. | Estoy de acuerdo.
Secondo me... | Para mí... / En mi opinión...
Dipende. | Depende.
Ci vediamo! | ¡Nos vemos!
Buona serata! | ¡Que tengas buena noche! | Para despedirte desde la tarde. "Buonasera" es para saludar.
#flu
Allora... | Entonces... / Bueno... | La muletilla número uno para ganar tiempo.
Cioè... | O sea...
Quindi | Así que / Entonces
Comunque | De todas formas
Infatti | De hecho / Justamente
Magari! | ¡Ojalá! / Quizás
Insomma | En fin / Más o menos
Ecco! | ¡Eso! / ¡Ahí está!
Dai! | ¡Dale! / ¡Vamos!
Boh. | Ni idea.
Praticamente | Prácticamente / Básicamente
Purtroppo | Lamentablemente
Per fortuna | Por suerte
Meno male! | ¡Menos mal!
Mica male! | ¡Nada mal!
Ogni tanto | De vez en cuando
Non ancora. | Todavía no.
Che ne pensi? | ¿Qué te parece? / ¿Qué pensás?
#strut
Devo andare. | Me tengo que ir.
Posso entrare? | ¿Puedo pasar?
Mi piacciono i dolci calabresi. | Me gustan los dulces calabreses. | Plural: "mi piacciono". Singular: "mi piace".
Mi piacerebbe visitare Reggio. | Me gustaría visitar Reggio.
Ci vuole un'ora. | Lleva una hora. | "Ci vuole" + tiempo/cosa = hace falta, lleva.
Ci sono molti negozi in centro. | Hay muchos negocios en el centro.
Sto mangiando. | Estoy comiendo.
Sto per uscire. | Estoy por salir.
Ho appena finito. | Recién terminé.
Ieri sono andato a Reggio. | Ayer fui a Reggio. | Para "fui" los italianos usan el passato prossimo: "sono andato".
Ho fatto la spesa. | Hice las compras.
Domani vado al mare. | Mañana voy al mar.
Ne ho due. | Tengo dos. | "Ne" = de eso. Obligatorio cuando decís una cantidad sin repetir la cosa.
Ce l'ho. | Lo tengo.
Ci vado domani. | Voy (allá) mañana.
Me ne vado. | Me voy.
Mi manca l'Argentina. | Extraño Argentina. | "Mancare" = extrañar, con la estructura de "gustar".
Ho voglia di una pizza. | Tengo ganas de una pizza.
Ho fame. | Tengo hambre.
Ho sonno. | Tengo sueño. | Una sola n en "sono" (soy) y dos en "sonno" (sueño).
Fa lo stesso. | Da igual.
Non vedo l'ora! | ¡No veo la hora!
`;

const LESSONS = [
{ id:"pron", t:"Cómo suena el italiano", s:"Las 7 reglas que cambian respecto del español",
  html:`<p>Casi todo se lee como en español. Lo que cambia:</p>
<div class="tbl-wrap"><table><tr><th>Escrito</th><th>Suena</th><th>Ejemplo</th></tr>
<tr><td><b>ci, ce</b></td><td>chi, che</td><td><button class="say" data-say="ciao, cena, cittadinanza">ciao, cena</button></td></tr>
<tr><td><b>chi, che</b></td><td>qui, que</td><td><button class="say" data-say="chiave, perché">chiave, perché</button></td></tr>
<tr><td><b>gi, ge</b></td><td>"yi" argentina suave (dj)</td><td><button class="say" data-say="giorno, gelato">giorno, gelato</button></td></tr>
<tr><td><b>gn</b></td><td>ñ</td><td><button class="say" data-say="bagno, cognome">bagno, cognome</button></td></tr>
<tr><td><b>gli</b></td><td>"lli" muy suave</td><td><button class="say" data-say="famiglia, figlio">famiglia, figlio</button></td></tr>
<tr><td><b>sci, sce</b></td><td>shi, she</td><td><button class="say" data-say="scena, uscita">scena, uscita</button></td></tr>
<tr><td><b>z, zz</b></td><td>ts (a veces ds)</td><td><button class="say" data-say="piazza, grazie">piazza, grazie</button></td></tr>
</table></div>
<p><b>Las dobles se sostienen</b> y cambian el significado: <button class="say" data-say="sono, sonno">sono / sonno</button> (soy / sueño), <button class="say" data-say="caro, carro">caro / carro</button>, <button class="say" data-say="pala, palla">pala / palla</button>.</p>
<p><b>La h no suena</b>: <i>ho, hai, ha, hanno</i> se dicen "o, ai, a, anno".</p>`,
  drills:[
  {q:"¿Cómo suena «ciao»?", o:["chao","siao","kiao"], a:0},
  {q:"¿Cómo suena «chiave»?", o:["chiave, con ch española","kiave","shiave"], a:1},
  {q:"¿Cómo suena «cognome»?", o:["cog-nome","coñome","co-nome"], a:1},
  {q:"¿Cómo suena «uscita»?", o:["us-chita","ushita","uskita"], a:1},
  {q:"¿Qué significa «sonno»?", o:["soy","sueño","sonido"], a:1},
  {q:"¿Cómo suena «piazza»?", o:["piasa","piatsa","piaza con z española"], a:1},
  {q:"«Ho fame» se pronuncia…", o:["jo fame","o fame","go fame"], a:1}
  ]},
{ id:"ess", t:"Essere, avere y stare", s:"Ser, estar, tener: dónde se cruzan",
  html:`<div class="tbl-wrap"><table><tr><th></th><th>essere</th><th>avere</th><th>stare</th></tr>
<tr><td>io</td><td><b>sono</b></td><td><b>ho</b></td><td><b>sto</b></td></tr>
<tr><td>tu</td><td>sei</td><td>hai</td><td>stai</td></tr>
<tr><td>lui/lei/Lei</td><td>è</td><td>ha</td><td>sta</td></tr>
<tr><td>noi</td><td>siamo</td><td>abbiamo</td><td>stiamo</td></tr>
<tr><td>voi</td><td>siete</td><td>avete</td><td>state</td></tr>
<tr><td>loro</td><td>sono</td><td>hanno</td><td>stanno</td></tr></table></div>
<ul><li><b>essere</b> = ser y casi siempre estar: <i>sono stanco</i> (estoy cansado), <i>sono a casa</i> (estoy en casa).</li>
<li><b>stare</b> solo para: <i>come stai?</i>, <i>sto bene</i>, <i>sto mangiando</i> (gerundio), <i>sto per uscire</i> (estoy por).</li>
<li><b>avere</b> como en español para edad y sensaciones: <i>ho 32 anni, ho fame, ho sete, ho freddo, ho caldo, ho sonno, ho ragione</i>.</li></ul>`,
  drills:[
  {q:"Estoy cansado.", a:["sono stanco"]},
  {q:"Tengo frío.", a:["ho freddo"]},
  {q:"¿Cómo estás?", a:["come stai"]},
  {q:"Estoy en casa.", a:["sono a casa"]},
  {q:"Tenés razón.", a:["hai ragione"]},
  {q:"Estoy comiendo.", a:["sto mangiando"]},
  {q:"Estamos por salir.", a:["stiamo per uscire"]},
  {q:"Tengo treinta y dos años.", a:["ho trentadue anni","ho 32 anni"]}
  ]},
{ id:"art", t:"Artículos", s:"il, lo, la, l', i, gli, le",
  html:`<div class="tbl-wrap"><table><tr><th>Delante de…</th><th>singular</th><th>plural</th><th>un/una</th></tr>
<tr><td>masc. + consonante</td><td><b>il</b> libro</td><td><b>i</b> libri</td><td>un libro</td></tr>
<tr><td>masc. + s+consonante, z, gn, ps</td><td><b>lo</b> zaino</td><td><b>gli</b> zaini</td><td>uno zaino</td></tr>
<tr><td>masc. + vocal</td><td><b>l'</b>amico</td><td><b>gli</b> amici</td><td>un amico</td></tr>
<tr><td>fem. + consonante</td><td><b>la</b> casa</td><td><b>le</b> case</td><td>una casa</td></tr>
<tr><td>fem. + vocal</td><td><b>l'</b>amica</td><td><b>le</b> amiche</td><td>un'amica</td></tr></table></div>
<p>Plurales: <b>-o → -i</b>, <b>-a → -e</b>, <b>-e → -i</b> (<i>il fiore → i fiori</i>). Las palabras con acento final no cambian: <i>la città → le città</i>.</p>`,
  drills:[
  {q:"___ zaino (la mochila)", a:["lo"]},
  {q:"___ amico", a:["l'"]},
  {q:"___ studente", a:["lo"]},
  {q:"___ casa", a:["la"]},
  {q:"___ ragazzi (los chicos)", a:["i"]},
  {q:"___ amici", a:["gli"]},
  {q:"___ zaini", a:["gli"]},
  {q:"___ case", a:["le"]},
  {q:"(un/uno/una/un') ___ zaino", a:["uno"]},
  {q:"(un/uno/una/un') ___ amica", a:["un'"]}
  ]},
{ id:"pres", t:"Presente regular", s:"-are, -ere, -ire (y los de -isc-)",
  html:`<div class="tbl-wrap"><table><tr><th></th><th>parlare</th><th>prendere</th><th>dormire</th><th>capire</th></tr>
<tr><td>io</td><td>parl<b>o</b></td><td>prend<b>o</b></td><td>dorm<b>o</b></td><td>cap<b>isco</b></td></tr>
<tr><td>tu</td><td>parl<b>i</b></td><td>prend<b>i</b></td><td>dorm<b>i</b></td><td>cap<b>isci</b></td></tr>
<tr><td>lui/lei</td><td>parl<b>a</b></td><td>prend<b>e</b></td><td>dorm<b>e</b></td><td>cap<b>isce</b></td></tr>
<tr><td>noi</td><td>parl<b>iamo</b></td><td>prend<b>iamo</b></td><td>dorm<b>iamo</b></td><td>cap<b>iamo</b></td></tr>
<tr><td>voi</td><td>parl<b>ate</b></td><td>prend<b>ete</b></td><td>dorm<b>ite</b></td><td>cap<b>ite</b></td></tr>
<tr><td>loro</td><td>parl<b>ano</b></td><td>prend<b>ono</b></td><td>dorm<b>ono</b></td><td>cap<b>iscono</b></td></tr></table></div>
<ul><li>"Tú" termina siempre en <b>-i</b>: <i>parli, prendi, dormi</i>.</li>
<li>"Nosotros" termina siempre en <b>-iamo</b>.</li>
<li>"Ellos" se acentúa atrás: <button class="say" data-say="parlano, prendono">PAR-la-no, PREN-do-no</button>.</li>
<li>Como <i>capire</i>: finire, preferire, pulire, spedire.</li></ul>`,
  drills:[
  {q:"(parlare) io ___", a:["parlo"]},
  {q:"(prendere) noi ___", a:["prendiamo"]},
  {q:"(dormire) loro ___", a:["dormono"]},
  {q:"(capire) io non ___", a:["capisco"]},
  {q:"(abitare) voi ___", a:["abitate"]},
  {q:"(finire) lei ___", a:["finisce"]},
  {q:"(scrivere) tu ___", a:["scrivi"]},
  {q:"(lavorare) loro ___", a:["lavorano"]}
  ]},
{ id:"irr", t:"Los irregulares que más usás", s:"andare, fare, volere, potere, dovere…",
  html:`<div class="tbl-wrap"><table><tr><th></th><th>andare</th><th>fare</th><th>volere</th><th>potere</th><th>dovere</th></tr>
<tr><td>io</td><td>vado</td><td>faccio</td><td>voglio</td><td>posso</td><td>devo</td></tr>
<tr><td>tu</td><td>vai</td><td>fai</td><td>vuoi</td><td>puoi</td><td>devi</td></tr>
<tr><td>lui/lei</td><td>va</td><td>fa</td><td>vuole</td><td>può</td><td>deve</td></tr>
<tr><td>noi</td><td>andiamo</td><td>facciamo</td><td>vogliamo</td><td>possiamo</td><td>dobbiamo</td></tr>
<tr><td>voi</td><td>andate</td><td>fate</td><td>volete</td><td>potete</td><td>dovete</td></tr>
<tr><td>loro</td><td>vanno</td><td>fanno</td><td>vogliono</td><td>possono</td><td>devono</td></tr></table></div>
<div class="tbl-wrap"><table><tr><th></th><th>venire</th><th>uscire</th><th>sapere</th><th>dire</th><th>dare</th></tr>
<tr><td>io</td><td>vengo</td><td>esco</td><td>so</td><td>dico</td><td>do</td></tr>
<tr><td>tu</td><td>vieni</td><td>esci</td><td>sai</td><td>dici</td><td>dai</td></tr>
<tr><td>lui/lei</td><td>viene</td><td>esce</td><td>sa</td><td>dice</td><td>dà</td></tr>
<tr><td>noi</td><td>veniamo</td><td>usciamo</td><td>sappiamo</td><td>diciamo</td><td>diamo</td></tr>
<tr><td>voi</td><td>venite</td><td>uscite</td><td>sapete</td><td>dite</td><td>date</td></tr>
<tr><td>loro</td><td>vengono</td><td>escono</td><td>sanno</td><td>dicono</td><td>danno</td></tr></table></div>
<p><b>Dovere</b> = "tener que": <i>devo andare</i> (tengo que ir). Para pedir, <i>voglio</i> suena brusco: usá <i>vorrei</i>.</p>`,
  drills:[
  {q:"Voy al Comune.", a:["vado in comune","vado al comune"]},
  {q:"¿Qué hacés?", a:["che fai","cosa fai","che cosa fai"]},
  {q:"¿Puedo pagar con tarjeta?", a:["posso pagare con la carta"]},
  {q:"Tenemos que volver mañana.", a:["dobbiamo tornare domani"]},
  {q:"No sé.", a:["non lo so","non so"]},
  {q:"Salgo a las ocho.", a:["esco alle otto","esco alle 8"]},
  {q:"Vienen mañana.", a:["vengono domani"]},
  {q:"¿Qué querés?", a:["cosa vuoi","che vuoi","che cosa vuoi"]}
  ]},
{ id:"prep", t:"Preposiciones + artículo", s:"al, del, nel, dal, sul…",
  html:`<p>En español solo existen <i>al</i> y <i>del</i>. En italiano se unen casi todas:</p>
<div class="tbl-wrap"><table><tr><th></th><th>il</th><th>lo</th><th>l'</th><th>la</th><th>i</th><th>gli</th><th>le</th></tr>
<tr><td><b>di</b></td><td>del</td><td>dello</td><td>dell'</td><td>della</td><td>dei</td><td>degli</td><td>delle</td></tr>
<tr><td><b>a</b></td><td>al</td><td>allo</td><td>all'</td><td>alla</td><td>ai</td><td>agli</td><td>alle</td></tr>
<tr><td><b>da</b></td><td>dal</td><td>dallo</td><td>dall'</td><td>dalla</td><td>dai</td><td>dagli</td><td>dalle</td></tr>
<tr><td><b>in</b></td><td>nel</td><td>nello</td><td>nell'</td><td>nella</td><td>nei</td><td>negli</td><td>nelle</td></tr>
<tr><td><b>su</b></td><td>sul</td><td>sullo</td><td>sull'</td><td>sulla</td><td>sui</td><td>sugli</td><td>sulle</td></tr></table></div>
<ul><li>Ciudades y pueblos: <b>a</b> (<i>abito a Varapodio</i>). Países y regiones: <b>in</b> (<i>vivo in Italia, in Calabria</i>).</li>
<li>A la casa o negocio de una persona: <b>da</b> (<i>vado dal medico, dal barbiere</i>).</li>
<li>Lugares fijos sin artículo: <i>in banca, in ufficio, in centro, in farmacia, a casa</i>.</li>
<li>Horas: <i>alle otto, dalle nove alle sei</i>.</li></ul>`,
  drills:[
  {q:"Vado ___ bar. (a + il)", a:["al"]},
  {q:"Le chiavi sono ___ borsa. (in + la)", a:["nella"]},
  {q:"Vado ___ medico. (a casa del médico)", a:["dal"]},
  {q:"Il nome ___ bisnonno. (di + il)", a:["del"]},
  {q:"Vado ___ stazione. (a + la)", a:["alla"]},
  {q:"Abito ___ Varapodio.", a:["a"]},
  {q:"Vivo ___ Italia.", a:["in"]},
  {q:"Torno ___ ufficio. (da + l')", a:["dall'"]},
  {q:"Il libro è ___ tavolo. (su + il)", a:["sul"]}
  ]},
{ id:"pp", t:"Pasado: passato prossimo", s:"\"Ayer fui\" = ieri sono andato",
  html:`<p>Para lo que hiciste (ayer, la semana pasada) los italianos usan casi siempre <b>avere/essere + participio</b>. Equivale a nuestro "fui", "comí", "hice".</p>
<ul><li><b>Con avere</b> (la mayoría): <i>ho mangiato, ho comprato, ho dormito</i>.</li>
<li><b>Con essere</b> los de movimiento, cambio de estado y los reflexivos: <i>sono andato, sono arrivato, sono uscito, sono stato, sono nato, sono rimasto, mi sono svegliato</i>. Con essere el participio concuerda: <i>lei è andat<b>a</b>, siamo andat<b>i</b></i>.</li></ul>
<div class="tbl-wrap"><table><tr><th>Participios irregulares clave</th></tr>
<tr><td>fare → <b>fatto</b> · dire → <b>detto</b> · vedere → <b>visto</b> · prendere → <b>preso</b></td></tr>
<tr><td>mettere → <b>messo</b> · scrivere → <b>scritto</b> · leggere → <b>letto</b> · chiedere → <b>chiesto</b></td></tr>
<tr><td>aprire → <b>aperto</b> · essere → <b>stato</b> · venire → <b>venuto</b> · rimanere → <b>rimasto</b></td></tr></table></div>`,
  drills:[
  {q:"Ayer comí pizza.", a:["ieri ho mangiato la pizza","ieri ho mangiato pizza","ieri ho mangiato una pizza"]},
  {q:"Fui al Comune.", a:["sono andato al comune"]},
  {q:"Llegamos el viernes.", a:["siamo arrivati venerdì","siamo arrivati venerdi"]},
  {q:"¿Qué hiciste?", a:["cosa hai fatto","che hai fatto","che cosa hai fatto"]},
  {q:"Ella salió temprano.", a:["è uscita presto","lei è uscita presto"]},
  {q:"Compré el pan.", a:["ho comprato il pane"]},
  {q:"Nací en Córdoba.", a:["sono nato a córdoba","sono nato a cordoba"]},
  {q:"Me desperté tarde.", a:["mi sono svegliato tardi"]}
  ]},
{ id:"cine", t:"Ci y ne", s:"Las dos palabritas que más te van a costar",
  html:`<p><b>ci</b> = "allá / ahí" (y aparece en muchas expresiones fijas):</p>
<ul><li><i>Vai al mare? — Sì, <b>ci</b> vado domani.</i> (Sí, voy mañana.)</li>
<li><i><b>c'è</b> / <b>ci sono</b></i> = hay · <i><b>ci vuole</b> un'ora</i> = lleva una hora · <i><b>ce l'</b>ho</i> = lo tengo.</li></ul>
<p><b>ne</b> = "de eso". Obligatorio con cantidades:</p>
<ul><li><i>Quanti panini vuoi? — <b>Ne</b> voglio due.</i> (Quiero dos.)</li>
<li><i>Che <b>ne</b> pensi?</i> (¿Qué pensás de eso?) · <i>Me <b>ne</b> vado.</i> (Me voy.)</li></ul>`,
  drills:[
  {q:"¿Vas al Comune? —Sí, voy (allá) mañana.", a:["sì ci vado domani","si ci vado domani","ci vado domani"]},
  {q:"¿Cuántos querés? —Quiero tres.", a:["ne voglio tre"]},
  {q:"¿Tenés el pasaporte? —Sí, lo tengo.", a:["sì ce l'ho","si ce l'ho","ce l'ho"]},
  {q:"Me voy.", a:["me ne vado"]},
  {q:"¿Qué pensás (de eso)?", a:["che ne pensi","cosa ne pensi"]},
  {q:"Hay dos panaderías.", a:["ci sono due panifici","ci sono due panetterie","ci sono due forni"]},
  {q:"Lleva una hora.", a:["ci vuole un'ora","ci vuole un ora"]}
  ]},
{ id:"pron2", t:"Pronombres y el Lei", s:"lo, la, gli, le, Le… y hablar de usted",
  html:`<div class="tbl-wrap"><table><tr><th></th><th>directo (lo veo)</th><th>indirecto (le digo)</th></tr>
<tr><td>a mí / a vos</td><td>mi / ti</td><td>mi / ti</td></tr>
<tr><td>él</td><td><b>lo</b></td><td><b>gli</b></td></tr>
<tr><td>ella</td><td><b>la</b></td><td><b>le</b></td></tr>
<tr><td>usted</td><td><b>La</b></td><td><b>Le</b></td></tr>
<tr><td>nosotros / ustedes</td><td>ci / vi</td><td>ci / vi</td></tr>
<tr><td>ellos / ellas</td><td>li / le</td><td>gli</td></tr></table></div>
<ul><li><b>Lei</b> (usted) usa la 3.ª persona femenina, aunque hables con un hombre: <i>Come sta? Lei è di qui?</i></li>
<li>Con infinitivo, el pronombre se pega al final o va antes: <i>posso farlo = lo posso fare</i>.</li>
<li>Ojo: <i>ringraziare</i> lleva directo: <i><b>La</b> ringrazio</i> (le agradezco).</li></ul>`,
  drills:[
  {q:"¿El pan? Lo compro yo.", a:["il pane lo compro io"]},
  {q:"La llamo mañana (a ella).", a:["la chiamo domani"]},
  {q:"Le escribo (a él).", a:["gli scrivo"]},
  {q:"¿Cómo está (usted)?", a:["come sta"]},
  {q:"Le agradezco (a usted).", a:["la ringrazio"]},
  {q:"¿Me ayuda?", a:["mi aiuta"]},
  {q:"Puedo hacerlo.", a:["posso farlo","lo posso fare"]}
  ]},
{ id:"piac", t:"Piacere y mancare", s:"Gustar y extrañar funcionan igual",
  html:`<ul><li><i>Mi <b>piace</b> il caffè</i> (singular o verbo) · <i>Mi <b>piacciono</b> i cannoli</i> (plural).</li>
<li>mi, ti, gli (a él), le (a ella), Le (a usted), ci, vi, gli (a ellos).</li>
<li>Condicional: <i>mi piacerebbe</i> = me gustaría. Pasado: <i>mi <b>è</b> piaciuto</i> (con essere).</li>
<li><b>Mancare</b> = extrañar, con la misma estructura: <i>mi manca l'Argentina</i>, <i>mi mancano i miei amici</i>.</li></ul>`,
  drills:[
  {q:"Me gusta el café.", a:["mi piace il caffè","mi piace il caffe"]},
  {q:"Me gustan los cannoli.", a:["mi piacciono i cannoli"]},
  {q:"¿Te gusta Varapodio?", a:["ti piace varapodio"]},
  {q:"Me gustaría ir a Reggio.", a:["mi piacerebbe andare a reggio"]},
  {q:"Extraño Argentina.", a:["mi manca l'argentina"]},
  {q:"Me gustó mucho.", a:["mi è piaciuto molto","mi è piaciuta molto","mi e piaciuto molto"]},
  {q:"A ella le gusta bailar.", a:["le piace ballare","a lei piace ballare"]}
  ]},
{ id:"fut", t:"Futuro y cortesía", s:"Vorrei, potrebbe, farò…",
  html:`<ul><li>Para planes cercanos alcanza el presente: <i>domani <b>vado</b> a Reggio</i>.</li>
<li>Futuro: <i>parl<b>erò</b>, prend<b>erò</b>, part<b>irò</b></i>. Irregulares: <i>sarò, avrò, andrò, farò, potrò, dovrò, verrò, vorrò</i>.</li>
<li>Condicional para pedir con educación: <i><b>vorrei</b></i> (quisiera), <i><b>potrebbe</b>…?</i> (¿podría…?), <i><b>dovrei</b></i> (debería). Para "tú": <i>potresti, dovresti</i>.</li></ul>`,
  drills:[
  {q:"Mañana voy a Reggio.", a:["domani vado a reggio"]},
  {q:"Quisiera un café.", a:["vorrei un caffè","vorrei un caffe"]},
  {q:"¿Podría repetir? (usted)", a:["potrebbe ripetere"]},
  {q:"Deberías descansar.", a:["dovresti riposare"]},
  {q:"El año que viene seré ciudadano.", a:["l'anno prossimo sarò cittadino","l'anno prossimo saro cittadino"]},
  {q:"Lo haré mañana.", a:["lo farò domani","lo faro domani"]},
  {q:"¿Podría ayudarme? (usted)", a:["potrebbe aiutarmi","mi potrebbe aiutare"]}
  ]},
{ id:"imp", t:"Contar historias: imperfetto", s:"era, c'era, facevo… igual que en español",
  html:`<p>El imperfetto se usa exactamente como nuestro imperfecto: descripciones, costumbres, el contexto de una historia.</p>
<div class="tbl-wrap"><table><tr><th></th><th>parlare</th><th>avere</th><th>essere</th><th>fare</th></tr>
<tr><td>io</td><td>parlavo</td><td>avevo</td><td>ero</td><td>facevo</td></tr>
<tr><td>tu</td><td>parlavi</td><td>avevi</td><td>eri</td><td>facevi</td></tr>
<tr><td>lui/lei</td><td>parlava</td><td>aveva</td><td>era</td><td>faceva</td></tr>
<tr><td>noi</td><td>parlavamo</td><td>avevamo</td><td>eravamo</td><td>facevamo</td></tr>
<tr><td>voi</td><td>parlavate</td><td>avevate</td><td>eravate</td><td>facevate</td></tr>
<tr><td>loro</td><td>parlavano</td><td>avevano</td><td>erano</td><td>facevano</td></tr></table></div>
<p>La regla para contar: <b>imperfetto</b> para el fondo y <b>passato prossimo</b> para lo que pasó. <i>Mentre mangiavo (fondo), è arrivato Marco (lo que pasó).</i></p>`,
  drills:[
  {q:"Mi bisabuelo era de Varapodio.", a:["il mio bisnonno era di varapodio"]},
  {q:"Cuando era chico, jugaba al fútbol.", a:["quando ero piccolo giocavo a calcio"]},
  {q:"Había mucha gente.", a:["c'era molta gente","c'era tanta gente"]},
  {q:"Hacía frío.", a:["faceva freddo"]},
  {q:"Mientras comía, llegó Marco.", a:["mentre mangiavo è arrivato marco","mentre mangiavo e arrivato marco"]},
  {q:"Ayer fui al mercado porque no tenía pan.", a:["ieri sono andato al mercato perché non avevo pane","ieri sono andato al mercato perché non avevo il pane","ieri sono andato al mercato perche non avevo pane"]}
  ]}
];

const RULES = [
  ["-ción → -zione","nación → nazione · información → informazione · estación → stazione","nazione, informazione, stazione"],
  ["-dad / -tad → -tà","ciudad → città · universidad → università · libertad → libertà","città, università, libertà"],
  ["ie → e","tiempo → tempo · fiesta → festa · tierra → terra","tempo, festa, terra"],
  ["ue → uo / o","bueno → buono · nuevo → nuovo · fuego → fuoco · puerta → porta","buono, nuovo, fuoco, porta"],
  ["ch (de un ct latino) → tt","noche → notte · leche → latte · ocho → otto · hecho → fatto","notte, latte, otto, fatto"],
  ["h- inicial → f-","hacer → fare · hijo → figlio · hambre → fame · humo → fumo","fare, figlio, fame, fumo"],
  ["ll- inicial → chi- / pi- / fi-","llamar → chiamare · llave → chiave · lleno → pieno · llama → fiamma","chiamare, chiave, pieno, fiamma"],
  ["pl- / bl- / fl- → pi- / bi- / fi-","plaza → piazza · blanco → bianco · flor → fiore","piazza, bianco, fiore"],
  ["j → gl / gi / cchi","hijo → figlio · ajo → aglio · joven → giovane · ojo → occhio","figlio, aglio, giovane, occhio"],
  ["es- inicial → s-","escuela → scuola · estudiar → studiare · español → spagnolo","scuola, studiare, spagnolo"],
  ["x / cs → ss","examen → esame · próximo → prossimo · máximo → massimo","esame, prossimo, massimo"],
  ["consonante final → + e / o","mar → mare · sol → sole · flor → fiore · amor → amore · profesor → professore","mare, sole, fiore, amore, professore"],
  ["-ar / -er / -ir → -are / -ere / -ire","hablar → parlare · comprender → capire (ojo) · vivir → vivere","comprare, vedere, dormire"],
  ["-mente se mantiene","rápidamente → rapidamente · solamente → solamente","rapidamente, solamente"]
];

const FALSI = [
  ["burro","manteca","burro = asino"],
  ["salire","subir","salir = uscire"],
  ["caldo","caliente / calor","caldo de sopa = brodo"],
  ["guardare","mirar","guardar = mettere via"],
  ["aceto","vinagre","aceite = olio"],
  ["gamba","pierna",""],
  ["camera","habitación","cámara de fotos = macchina fotografica"],
  ["tirare","tirar de / jalar","tirar a la basura = buttare"],
  ["subito","enseguida","súbito = improvviso"],
  ["imbarazzata","avergonzada","embarazada = incinta"],
  ["topo","ratón",""],
  ["largo","ancho","largo = lungo"],
  ["contestare","objetar / protestar","contestar = rispondere"],
  ["fermare","detener / parar","firmar = firmare"],
  ["autista","chofer",""],
  ["rumore","ruido","rumor = voce, pettegolezzo"],
  ["officina","taller mecánico","oficina = ufficio"],
  ["pronto","¿hola? (al teléfono) / listo","pronto (enseguida) = presto"],
  ["presto","temprano / pronto","prestado = prestato"],
  ["carta","papel / tarjeta","carta (correo) = lettera"],
  ["macchina","auto",""],
  ["loro","ellos","loro (el pájaro) = pappagallo"],
  ["prendere in giro","burlarse de alguien",""],
  ["salato","salado","¡igual! pero 'dolce' es dulce y también postre"]
];

const SPK = {T:"Vos"};
const DIALOGS_TXT = `
@bar|Al bar|En el bar, pidiendo y pagando|B=Barista
B: Buongiorno! Cosa le preparo? | ¡Buen día! ¿Qué le preparo?
T: Buongiorno! Un caffè e un cornetto, per favore. | ¡Buen día! Un café y una medialuna, por favor.
B: Il cornetto vuoto o alla crema? | ¿La medialuna sola o con crema?
T: Alla crema. Quant'è? | Con crema. ¿Cuánto es?
B: Due euro e cinquanta. Si paga alla cassa, grazie. | Dos euros con cincuenta. Se paga en la caja, gracias.
T: Posso pagare con la carta? | ¿Puedo pagar con tarjeta?
B: Certo, nessun problema. | Claro, no hay problema.
T: Grazie, buona giornata! | ¡Gracias, que tenga buen día!
@alim|All'alimentari|Comprar por peso en el almacén|N=Negoziante
N: Buongiorno, mi dica. | Buen día, dígame.
T: Buongiorno. Vorrei due etti di prosciutto crudo e mezzo chilo di pane. | Buen día. Quería 200 gramos de jamón crudo y medio kilo de pan.
N: Il prosciutto glielo taglio sottile? | ¿El jamón se lo corto finito?
T: Sì, sottile, grazie. Avete anche la 'nduja? | Sí, finito, gracias. ¿Tienen también 'nduja?
N: Certo, è calabrese! Quanta ne vuole? | ¡Claro, es calabresa! ¿Cuánta quiere?
T: Ne prendo un etto. | Llevo cien gramos.
N: Altro? | ¿Algo más?
T: Basta così, grazie. Quant'è? | Nada más, gracias. ¿Cuánto es?
N: Sono nove euro e venti. | Son nueve euros con veinte.
@anag|All'anagrafe|Pedir la residencia en el Comune|I=Impiegata
I: Buongiorno, prego, si accomodi. | Buen día, pase, tome asiento.
T: Buongiorno. Vorrei richiedere la residenza a Varapodio. | Buen día. Quisiera pedir la residencia en Varapodio.
I: Va bene. Ha il passaporto e il codice fiscale? | Bien. ¿Tiene el pasaporte y el codice fiscale?
T: Sì, ecco. Ho anche il contratto d'affitto. | Sí, acá tiene. También tengo el contrato de alquiler.
I: Perfetto. Nei prossimi giorni passerà il vigile per il controllo. | Perfecto. En los próximos días va a pasar el vigile para el control.
T: Devo essere a casa? | ¿Tengo que estar en casa?
I: Sì, è meglio. E metta il suo nome sul campanello. | Sí, es mejor. Y ponga su nombre en el timbre.
T: Va bene. Quanto tempo ci vuole? | Bien. ¿Cuánto tiempo lleva?
I: Di solito qualche settimana. | Normalmente algunas semanas.
T: Grazie mille, arrivederci. | Muchas gracias, hasta luego.
@vig|Il vigile alla porta|La visita de control de residencia|V=Vigile
V: Buongiorno, polizia municipale. Cerco il signor Tomassich. | Buen día, policía municipal. Busco al señor Tomassich.
T: Sono io. Prego, entri pure. | Soy yo. Adelante, pase.
V: Lei abita qui? | ¿Usted vive acá?
T: Sì, abito qui da novembre. | Sí, vivo acá desde noviembre.
V: Vive qui da solo? | ¿Vive acá solo?
T: No, con un familiare. | No, con un familiar.
V: Va bene. Firmi qui, per favore. | Bien. Firme acá, por favor.
T: Ecco. Serve altro? | Listo. ¿Hace falta algo más?
V: No, è tutto. Buona giornata! | No, es todo. ¡Buen día!
@vic|Con un vicino|Primera charla en la vereda|V=Vicino
V: Buonasera! Lei è nuovo qui, vero? | ¡Buenas tardes! Usted es nuevo acá, ¿no?
T: Sì, sono arrivato da pochi giorni. Sono argentino. | Sí, llegué hace pocos días. Soy argentino.
V: Argentino! E come mai a Varapodio? | ¡Argentino! ¿Y cómo es que vino a Varapodio?
T: Il mio bisnonno era di qui. Sto facendo la cittadinanza. | Mi bisabuelo era de acá. Estoy haciendo la ciudadanía.
V: Che bello! Qual era il cognome? | ¡Qué lindo! ¿Cuál era el apellido?
T: Glielo scrivo, così magari lo conosce. | Se lo escribo, así capaz lo conoce.
V: Volentieri! Qui ci conosciamo tutti. | ¡Con gusto! Acá nos conocemos todos.
T: Mi piace molto il paese. La gente è gentilissima. | Me gusta mucho el pueblo. La gente es amabilísima.
V: Se ha bisogno di qualcosa, sono qui accanto. | Si necesita algo, estoy acá al lado.
T: Grazie, molto gentile. Buona serata! | Gracias, muy amable. ¡Buenas noches!
@farm|In farmacia|Contar qué te pasa|F=Farmacista
F: Buongiorno, mi dica. | Buen día, dígame.
T: Buongiorno. Ho mal di gola e un po' di febbre. | Buen día. Me duele la garganta y tengo un poco de fiebre.
F: Da quanto tempo? | ¿Desde hace cuánto?
T: Da ieri sera. | Desde anoche.
F: Ha allergie a qualche farmaco? | ¿Tiene alergia a algún medicamento?
T: No, nessuna. | No, ninguna.
F: Allora le do queste pastiglie. Una ogni otto ore, dopo i pasti. | Entonces le doy estas pastillas. Una cada ocho horas, después de comer.
T: Serve la ricetta? | ¿Hace falta receta?
F: No, sono da banco. Se tra tre giorni non migliora, vada dal medico. | No, son de venta libre. Si en tres días no mejora, vaya al médico.
T: Perfetto, grazie. | Perfecto, gracias.
@staz|In stazione|Boleto, andén y horario|O=Operatore
T: Buongiorno, un biglietto per Reggio Calabria, per favore. | Buen día, un boleto a Reggio Calabria, por favor.
O: Solo andata? | ¿Solo ida?
T: Andata e ritorno. A che ora parte il prossimo treno? | Ida y vuelta. ¿A qué hora sale el próximo tren?
O: Alle dieci e un quarto, dal binario due. | A las diez y cuarto, del andén dos.
T: Devo cambiare? | ¿Tengo que cambiar?
O: No, è diretto. Arriva alle undici e cinque. | No, es directo. Llega a las once y cinco.
T: Il biglietto va convalidato? | ¿Hay que validar el boleto?
O: Se è regionale, sì, prima di salire. | Si es regional, sí, antes de subir.
T: Grazie mille! | ¡Muchas gracias!
@tel|Al telefono|Llamar por un departamento|X=Proprietario
X: Pronto? | ¿Hola?
T: Pronto, buongiorno. Chiamo per l'appartamento in affitto. È ancora disponibile? | Hola, buen día. Llamo por el departamento en alquiler. ¿Sigue disponible?
X: Sì, è ancora libero. | Sí, todavía está libre.
T: Quant'è l'affitto al mese? | ¿Cuánto es el alquiler por mes?
X: Quattrocento euro, bollette escluse. | Cuatrocientos euros, sin los servicios.
T: Si può vedere domani pomeriggio? | ¿Se puede ver mañana a la tarde?
X: Sì, verso le cinque va bene? | Sí, ¿tipo cinco le queda bien?
T: Perfetto. Mi può mandare l'indirizzo su WhatsApp? | Perfecto. ¿Me puede mandar la dirección por WhatsApp?
X: Certo. A domani! | Claro. ¡Hasta mañana!
T: A domani, grazie! | ¡Hasta mañana, gracias!
`;

const TOPICS = [
  {t:"Presentate a un vecino", h:["Mi chiamo…","Sono argentino, di…","Sono qui per…","Il mio bisnonno era…","Resto almeno…","Mi piace…"]},
  {t:"Contá tu día de ayer", h:["Ieri mi sono svegliato alle…","Poi sono andato…","Ho mangiato…","Il pomeriggio ho lavorato…","La sera…","Allora…"]},
  {t:"Describí Córdoba a alguien que no la conoce", h:["È una città grande…","C'è / Ci sono…","D'estate fa caldo…","La gente è…","Mi manca…","Secondo me…"]},
  {t:"Explicá a qué te dedicás", h:["Mi occupo di…","Lavoro da remoto per…","Ogni giorno…","Mi piace perché…","La parte difficile è…","Cioè…"]},
  {t:"La historia de tu familia italiana", h:["Il mio bisnonno era…","È partito per l'Argentina…","Lavorava come…","Aveva… figli","Non è mai tornato…","Adesso io…"]},
  {t:"Qué te sorprendió de Italia", h:["Mi ha sorpreso che…","Qui la gente…","In Argentina invece…","Mi piace / non mi piace…","Per esempio…","Insomma…"]},
  {t:"Tus planes para el fin de semana", h:["Sabato vado…","Vorrei…","Se fa bel tempo…","Magari…","Domenica…","Non vedo l'ora di…"]},
  {t:"Tu música", h:["Faccio musica da…","Scrivo canzoni…","Il mio stile è…","Mi ispiro a…","Ho pubblicato…","Mi piacerebbe…"]},
  {t:"Cómo va tu trámite de ciudadanía", h:["Ho già fatto…","Mi manca…","Adesso aspetto…","Il vigile è passato / non è ancora passato","Spero di…","Ci vuole…"]}
];

const MISSIONS = [
  ["Saludá a tres personas y agregá una frase más.","Buongiorno! Che bella giornata!"],
  ["Pedí en el bar sin señalar nada: nombrá todo en italiano.","Vorrei un caffè e un cornetto alla crema."],
  ["Preguntá en un negocio qué te recomiendan y probalo.","Cosa mi consiglia?"],
  ["Preguntale a alguien por una calle, aunque sepas dónde queda.","Scusi, dov'è via Roma?"],
  ["Comprá algo por peso en el alimentari.","Mi dà due etti di…?"],
  ["Preguntá a qué hora abre y cierra un negocio.","A che ora aprite? E a che ora chiudete?"],
  ["Presentate a un vecino con cuatro frases.","Sono il nuovo vicino, mi chiamo Lautaro…"],
  ["Contale a alguien por qué estás en Varapodio.","Il mio bisnonno era di qui."],
  ["Señalá un objeto que no sepas nombrar y preguntá.","Come si dice questo in italiano?"],
  ["Preguntá cuál es la fiesta del pueblo y cuándo es.","Qual è la festa del paese? Quando si fa?"],
  ["Pedí una comida típica calabresa que no conozcas.","Cosa c'è di tipico calabrese?"],
  ["Pedile a alguien que te corrija y anotá la corrección.","Mi corregga, per favore."],
  ["Mandá un audio de WhatsApp de 1 minuto en italiano a alguien.","Ciao! Allora, ti racconto…"],
  ["Usá tres muletillas en una charla real.","Allora… cioè… insomma…"],
  ["Contá algo que hiciste ayer.","Ieri sono andato…"],
  ["Leé en voz alta un cartel o un menú y traducilo mentalmente.","Chiuso il lunedì…"],
  ["Escuchá una charla en el bar y anotá una palabra nueva.","Cosa vuol dire…?"],
  ["Caminá 10 minutos describiendo en italiano lo que ves.","C'è una chiesa, ci sono due bar…"],
  ["Preguntá a un comerciante cuánto hace que tiene el negocio.","Da quanto tempo ha il negozio?"],
  ["Hacé una llamada o pedido por teléfono en italiano.","Pronto, buongiorno, chiamo per…"]
];

