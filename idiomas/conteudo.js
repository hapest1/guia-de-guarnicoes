/* Missão Idiomas — conteúdo do protótipo (inglês, STANAG 6001 níveis 1 a 3).
   Habilidades na ordem do perfil SLP: L (compreensão auditiva), S (expressão oral),
   R (compreensão leitora), W (expressão escrita).

   Tipos de exercício:
   - choice : múltipla escolha. Campos: q, opts, a (índice certo). Opcionais: audio (texto lido pelo
              sintetizador e mostrado só depois da resposta), passage (texto para ler), pt (dica).
   - type   : resposta digitada. Campos: q, a (lista de respostas aceitas). Opcional: audio.
   - build  : montar a frase com o banco de palavras. Campos: pt, a (frase em inglês), extra (distratores).
   - match  : ligar pares. Campo: pairs [[en, pt], ...].
   - speak  : falar. Repetição: say (frase), pt. Fala livre: prompt, min (palavras), keys (conectivos/ideias).
   - write  : redação curta. Campos: prompt, min (palavras), keys (itens esperados), model (resposta-modelo).
*/

export const SKILLS = {
  L: { nome: 'Compreensão Auditiva', curto: 'Ouvir', icone: '🎧' },
  S: { nome: 'Expressão Oral', curto: 'Falar', icone: '🎙️' },
  R: { nome: 'Compreensão Leitora', curto: 'Ler', icone: '📖' },
  W: { nome: 'Expressão Escrita', curto: 'Escrever', icone: '✍️' },
};

export const NIVEIS = {
  1: { nome: 'Sobrevivência', desc: 'Frases simples, rotina, números e horários.' },
  2: { nome: 'Funcional', desc: 'Situações concretas do serviço, relatos e instruções.' },
  3: { nome: 'Profissional', desc: 'Opinião, argumentação, hipóteses e temas abstratos.' },
  4: { nome: 'Especialista', desc: 'Nuance, retórica e adequação ao público. Em breve, com tutor de IA.' },
};

export const LICOES = [
  /* ============================ OUVIR ============================ */
  {
    id: 'L1a', skill: 'L', lvl: 1, titulo: 'Apresentações', desc: 'Nome, posto e origem',
    ex: [
      { t: 'choice', audio: 'Good morning. I am Sergeant Silva. I am from Brazil.', q: 'Where is the speaker from?', opts: ['Brazil', 'Portugal', 'Spain', 'Chile'], a: 0 },
      { t: 'choice', audio: 'Hello, my name is Captain Brown. I work at the logistics office.', q: 'Where does Captain Brown work?', opts: ['At the hospital', 'At the logistics office', 'At the airport', 'At the training range'], a: 1 },
      { t: 'type', audio: 'Nice to meet you.', q: 'Escreva o que você ouviu.', a: ['nice to meet you'] },
      { t: 'choice', audio: 'I am a lieutenant. I am twenty-eight years old.', q: 'How old is the lieutenant?', opts: ['18', '24', '28', '38'], a: 2 },
      { t: 'type', audio: 'I am a soldier in the Brazilian Army.', q: 'Escreva o que você ouviu.', a: ['i am a soldier in the brazilian army', "i'm a soldier in the brazilian army"] },
      { t: 'choice', audio: 'This is Corporal Lee. She is my friend. She speaks English and Korean.', q: 'Which languages does Corporal Lee speak?', opts: ['English and Spanish', 'English and Korean', 'Korean and Japanese', 'Only English'], a: 1 },
    ],
  },
  {
    id: 'L1b', skill: 'L', lvl: 1, titulo: 'Horários e números', desc: 'Hora militar e quantidades',
    ex: [
      { t: 'choice', audio: 'The meeting is at fourteen hundred.', q: 'What time is the meeting?', opts: ['04:00', '14:00', '15:00', '16:00'], a: 1 },
      { t: 'choice', audio: 'Breakfast is from zero six hundred to zero seven thirty.', q: 'When does breakfast end?', opts: ['06:00', '06:30', '07:00', '07:30'], a: 3 },
      { t: 'type', audio: 'We have twelve vehicles.', q: 'Quantos veículos? Escreva o número.', a: ['12', 'twelve'] },
      { t: 'choice', audio: 'Room three one five is on the third floor.', q: 'What is the room number?', opts: ['135', '305', '315', '350'], a: 2 },
      { t: 'match', pairs: [['Monday', 'segunda-feira'], ['Wednesday', 'quarta-feira'], ['Friday', 'sexta-feira'], ['Sunday', 'domingo']] },
      { t: 'choice', audio: 'The bus leaves on Thursday at nineteen forty-five.', q: 'When does the bus leave?', opts: ['Tuesday, 19:45', 'Thursday, 19:45', 'Thursday, 9:45', 'Tuesday, 9:45'], a: 1 },
    ],
  },
  {
    id: 'L2a', skill: 'L', lvl: 2, titulo: 'Avisos e ordens', desc: 'Comunicados ao efetivo',
    ex: [
      { t: 'choice', audio: 'Attention all personnel. The briefing has been moved to Building Four at zero nine hundred. Bring your identification card.', q: 'What has changed?', opts: ['The date of the briefing', 'The place and time of the briefing', 'The speaker of the briefing', 'The briefing was cancelled'], a: 1 },
      { t: 'choice', audio: 'Attention all personnel. The briefing has been moved to Building Four at zero nine hundred. Bring your identification card.', q: 'What must people bring?', opts: ['A laptop', 'Their uniform', 'Their ID card', 'A notebook'], a: 2 },
      { t: 'choice', audio: 'Due to the storm warning, all outdoor training is suspended until further notice. Instructors should report to the operations room.', q: 'Why is training suspended?', opts: ['Lack of instructors', 'Bad weather', 'A holiday', 'An inspection'], a: 1 },
      { t: 'type', audio: 'Report to the operations room.', q: 'Escreva o que você ouviu.', a: ['report to the operations room'] },
      { t: 'choice', audio: 'Vehicles must not exceed thirty kilometers per hour inside the base. Violations will be reported to the commander.', q: 'What is the speed limit inside the base?', opts: ['13 km/h', '30 km/h', '40 km/h', '50 km/h'], a: 1 },
      { t: 'choice', audio: 'The medical team will be available in the gym on Tuesday morning for annual check-ups. Please schedule your appointment by Monday.', q: 'What should people do by Monday?', opts: ['Go to the gym', 'See the commander', 'Schedule an appointment', 'Complete a fitness test'], a: 2 },
    ],
  },
  {
    id: 'L2b', skill: 'L', lvl: 2, titulo: 'Relatos de situação', desc: 'O que aconteceu e o que fazer',
    ex: [
      { t: 'choice', audio: 'Patrol Alpha reports that the bridge on Route Seven was damaged by heavy rain last night. Vehicles must use the detour through the village.', q: 'What happened to the bridge?', opts: ['It was closed for repairs', 'It was damaged by rain', 'It was blocked by a truck', 'It was attacked'], a: 1 },
      { t: 'choice', audio: 'Patrol Alpha reports that the bridge on Route Seven was damaged by heavy rain last night. Vehicles must use the detour through the village.', q: 'What should vehicles do?', opts: ['Wait for the patrol', 'Return to base', 'Take the detour through the village', 'Cross the bridge slowly'], a: 2 },
      { t: 'choice', audio: 'At eleven hundred, a civilian truck broke down near the checkpoint. Nobody was injured, but traffic was stopped for about forty minutes.', q: 'Was anyone hurt?', opts: ['Yes, the driver', 'Yes, two soldiers', 'No, nobody was injured', 'The report does not say'], a: 2 },
      { t: 'type', audio: 'Nobody was injured.', q: 'Escreva o que você ouviu.', a: ['nobody was injured'] },
      { t: 'choice', audio: 'The supply convoy was delayed because two trucks needed new tires. It is now expected to arrive tomorrow morning instead of tonight.', q: 'When will the convoy arrive?', opts: ['Tonight', 'Tomorrow morning', 'Tomorrow night', 'In two days'], a: 1 },
      { t: 'choice', audio: 'We lost radio contact with the observation post for twenty minutes. The problem was a low battery, and it has already been replaced.', q: 'What caused the communication problem?', opts: ['Bad weather', 'A broken antenna', 'A low battery', 'Enemy jamming'], a: 2 },
    ],
  },
  {
    id: 'L3a', skill: 'L', lvl: 3, titulo: 'Briefing de missão de paz', desc: 'Ideia principal e inferência',
    ex: [
      { t: 'choice', audio: 'Our main challenge in this mission is not security, but trust. The local population has seen several foreign contingents come and go, and many feel that promises were not kept. Every patrol, every conversation at a market, either builds that trust or erodes it.', q: 'What is the main point of the speaker?', opts: ['Security is the biggest threat', 'Building trust with locals is the key challenge', 'Foreign contingents should leave', 'Patrols should avoid markets'], a: 1 },
      { t: 'choice', audio: 'Our main challenge in this mission is not security, but trust. The local population has seen several foreign contingents come and go, and many feel that promises were not kept. Every patrol, every conversation at a market, either builds that trust or erodes it.', q: 'What can be inferred about previous missions?', opts: ['They were very successful', 'They left some people disappointed', 'They never patrolled the area', 'They were all from the same country'], a: 1 },
      { t: 'choice', audio: 'The new rotation plan reduces the time each company spends at remote outposts from six weeks to four. In theory, this should lower fatigue. However, it also means more movements on the roads, which increases our exposure.', q: 'What is the speaker\'s concern about the new plan?', opts: ['Companies will be more tired', 'Outposts will be abandoned', 'More road movements increase risk', 'Four weeks is too long'], a: 2 },
      { t: 'type', audio: 'Every patrol either builds that trust or erodes it.', q: 'Escreva o que você ouviu.', a: ['every patrol either builds that trust or erodes it', 'every patrol either builds trust or erodes it'] },
      { t: 'choice', audio: 'I would not call the operation a failure. We met most of our objectives. That said, we underestimated how long it would take to train the local engineers, and that is a lesson we should not ignore.', q: 'How does the speaker evaluate the operation?', opts: ['A complete failure', 'A total success with no problems', 'Mostly successful, with an important lesson', 'Too early to judge'], a: 2 },
    ],
  },
  {
    id: 'L3b', skill: 'L', lvl: 3, titulo: 'Entrevista e opinião', desc: 'Atitude e argumentos do falante',
    ex: [
      { t: 'choice', audio: 'Some people argue that multinational exercises are too expensive for what they deliver. I understand the concern, but I think it misses the point. The real value is not the exercise itself, it is the relationships and the shared procedures that remain afterwards.', q: 'What is the speaker\'s attitude toward multinational exercises?', opts: ['Strongly against them', 'In favor, despite the costs', 'Neutral, with no opinion', 'In favor only if they are cheaper'], a: 1 },
      { t: 'choice', audio: 'Some people argue that multinational exercises are too expensive for what they deliver. I understand the concern, but I think it misses the point. The real value is not the exercise itself, it is the relationships and the shared procedures that remain afterwards.', q: 'According to the speaker, what is the "real value"?', opts: ['The training equipment', 'The media coverage', 'Lasting relationships and common procedures', 'The money saved'], a: 2 },
      { t: 'choice', audio: 'Frankly, technology alone will not solve our communication problems. We have excellent radios. What we lack is officers who can explain a complex situation clearly, in a second language, under pressure.', q: 'What does the speaker believe is missing?', opts: ['Better radios', 'More satellites', 'Clear communicators in a foreign language', 'Faster computers'], a: 2 },
      { t: 'choice', audio: 'Had we invested in language training ten years ago, we would not be facing this shortage of qualified liaison officers today.', q: 'What does the speaker mean?', opts: ['They invested in training ten years ago', 'The shortage is the result of not investing earlier', 'There are too many liaison officers', 'Language training is not necessary'], a: 1 },
      { t: 'type', audio: 'What we lack is officers who can explain a complex situation clearly.', q: 'Escreva o que você ouviu.', a: ['what we lack is officers who can explain a complex situation clearly'] },
    ],
  },

  /* ============================ FALAR ============================ */
  {
    id: 'S1a', skill: 'S', lvl: 1, titulo: 'Quem sou eu', desc: 'Apresente-se em voz alta',
    ex: [
      { t: 'speak', say: 'Good morning, sir.', pt: 'Bom dia, senhor.' },
      { t: 'speak', say: 'I am a lieutenant in the Brazilian Army.', pt: 'Sou tenente do Exército Brasileiro.' },
      { t: 'choice', q: 'Someone says "Nice to meet you." What is the best answer?', opts: ['Nice to meet you too.', 'I am fine.', 'Goodbye.', 'Yes, please.'], a: 0 },
      { t: 'speak', say: 'I am from Brazil. I live in Brasilia.', pt: 'Sou do Brasil. Moro em Brasília.' },
      { t: 'speak', say: 'I work in the communications section.', pt: 'Trabalho na seção de comunicações.' },
      { t: 'choice', q: 'How do you ask someone\'s name politely?', opts: ['What your name?', 'May I have your name, please?', 'You name is?', 'Name, please you?'], a: 1 },
    ],
  },
  {
    id: 'S1b', skill: 'S', lvl: 1, titulo: 'Pedir ajuda', desc: 'Perguntas do dia a dia',
    ex: [
      { t: 'speak', say: 'Excuse me, where is the dining facility?', pt: 'Com licença, onde fica o rancho?' },
      { t: 'speak', say: 'Can you help me, please?', pt: 'Você pode me ajudar, por favor?' },
      { t: 'choice', q: 'You did not understand. What do you say?', opts: ['Could you repeat that, please?', 'I understand everything.', 'Go away.', 'It is ten o\'clock.'], a: 0 },
      { t: 'speak', say: 'Could you speak more slowly, please?', pt: 'Você poderia falar mais devagar, por favor?' },
      { t: 'speak', say: 'What time does the meeting start?', pt: 'A que horas começa a reunião?' },
      { t: 'speak', say: 'I need a map of the base.', pt: 'Preciso de um mapa da base.' },
    ],
  },
  {
    id: 'S2a', skill: 'S', lvl: 2, titulo: 'Minha função', desc: 'Descreva seu trabalho',
    ex: [
      { t: 'speak', say: 'I am responsible for the maintenance of our vehicles.', pt: 'Sou responsável pela manutenção das nossas viaturas.' },
      { t: 'speak', say: 'My unit provides engineering support to the brigade.', pt: 'Minha unidade presta apoio de engenharia à brigada.' },
      { t: 'choice', q: 'Which sentence describes a routine correctly?', opts: ['Every morning we inspect the equipment.', 'Every morning we inspected the equipment tomorrow.', 'Every morning we are inspect the equipment.', 'Every morning we inspecting the equipment.'], a: 0 },
      { t: 'speak', say: 'On a typical day, I check the reports and plan the training.', pt: 'Num dia típico, confiro os relatórios e planejo a instrução.' },
      { t: 'speak', prompt: 'Describe your job in the Army. What do you do on a typical day?', min: 15, keys: ['responsible', 'every', 'usually', 'work', 'unit', 'day'] },
    ],
  },
  {
    id: 'S2b', skill: 'S', lvl: 2, titulo: 'Contar o que aconteceu', desc: 'Passado e sequência de fatos',
    ex: [
      { t: 'speak', say: 'Yesterday we conducted a field exercise near the river.', pt: 'Ontem realizamos um exercício de campo perto do rio.' },
      { t: 'choice', q: 'Choose the correct sequence word: "___, we set up the camp. Then we started the patrol."', opts: ['First', 'Never', 'Because', 'Although'], a: 0 },
      { t: 'speak', say: 'First we set up the camp, and then we started the patrol.', pt: 'Primeiro montamos o acampamento e depois iniciamos a patrulha.' },
      { t: 'speak', say: 'The exercise was difficult because it rained all night.', pt: 'O exercício foi difícil porque choveu a noite toda.' },
      { t: 'speak', prompt: 'Tell me about a recent exercise or mission. What happened? Use first, then, after that.', min: 20, keys: ['first', 'then', 'after', 'because', 'we', 'was'] },
    ],
  },
  {
    id: 'S3a', skill: 'S', lvl: 3, titulo: 'Defender uma opinião', desc: 'Argumentos e contra-argumentos',
    ex: [
      { t: 'choice', q: 'Which phrase introduces a counterargument?', opts: ['On the other hand,', 'For example,', 'First of all,', 'In addition,'], a: 0 },
      { t: 'speak', say: 'In my view, the benefits clearly outweigh the costs.', pt: 'Na minha opinião, os benefícios claramente superam os custos.' },
      { t: 'speak', say: 'That is a fair point, but I would argue that training is an investment.', pt: 'É um argumento justo, mas eu diria que a instrução é um investimento.' },
      { t: 'speak', prompt: 'Should all officers be required to speak a second language? Give your opinion with at least two arguments.', min: 35, keys: ['in my view', 'i believe', 'however', 'on the other hand', 'because', 'therefore', 'for example'] },
    ],
  },
  {
    id: 'S3b', skill: 'S', lvl: 3, titulo: 'Hipóteses', desc: 'E se você estivesse no comando?',
    ex: [
      { t: 'choice', q: 'Complete: "If I ___ in command, I would change the schedule."', opts: ['am', 'were', 'will be', 'have been'], a: 1 },
      { t: 'speak', say: 'If I were in command, I would invest more in communication.', pt: 'Se eu estivesse no comando, investiria mais em comunicação.' },
      { t: 'speak', say: 'Had we known about the storm, we would have postponed the operation.', pt: 'Se soubéssemos da tempestade, teríamos adiado a operação.' },
      { t: 'speak', prompt: 'Imagine you are the commander of a base in a peacekeeping mission. What would you change first, and why?', min: 40, keys: ['if i were', 'i would', 'because', 'however', 'in order to', 'would'] },
    ],
  },

  /* ============================ LER ============================ */
  {
    id: 'R1a', skill: 'R', lvl: 1, titulo: 'Placas e avisos', desc: 'Entenda sinais curtos',
    ex: [
      { t: 'choice', passage: 'NO ENTRY — AUTHORIZED PERSONNEL ONLY', q: 'What does this sign mean?', opts: ['Everybody can enter', 'Only people with permission can enter', 'The building is closed forever', 'Visitors must wait here'], a: 1 },
      { t: 'choice', passage: 'DINING FACILITY — Lunch: 1130–1300', q: 'When is lunch?', opts: ['11:30 to 13:00', '11:00 to 13:30', '13:00 to 14:30', '10:30 to 12:00'], a: 0 },
      { t: 'match', pairs: [['barracks', 'alojamento'], ['gate', 'portão'], ['headquarters', 'quartel-general'], ['range', 'estande de tiro']] },
      { t: 'choice', passage: 'CAUTION: WET FLOOR', q: 'What should you do?', opts: ['Run', 'Walk carefully', 'Clean the floor', 'Call the guard'], a: 1 },
      { t: 'choice', passage: 'SPEED LIMIT 20 — CHILDREN CROSSING', q: 'Why is the limit low?', opts: ['There is a school area', 'The road is new', 'It is a military zone', 'There are animals'], a: 0 },
    ],
  },
  {
    id: 'R1b', skill: 'R', lvl: 1, titulo: 'Mensagens curtas', desc: 'Bilhetes e e-mails simples',
    ex: [
      { t: 'choice', passage: 'Hi Paulo, the training is cancelled today. See you tomorrow at 0800. — Sgt Costa', q: 'When is the next training?', opts: ['Today at 08:00', 'Tomorrow at 08:00', 'Tomorrow at 18:00', 'It is cancelled forever'], a: 1 },
      { t: 'choice', passage: 'Dear Lieutenant, your new ID card is ready. Please collect it at the admin office, Room 12, before Friday.', q: 'Where should the lieutenant go?', opts: ['To the gate', 'To Room 12', 'To Room 21', 'To the commander\'s office'], a: 1 },
      { t: 'choice', passage: 'Dear Lieutenant, your new ID card is ready. Please collect it at the admin office, Room 12, before Friday.', q: 'What is the deadline?', opts: ['Monday', 'Wednesday', 'Before Friday', 'Next month'], a: 2 },
      { t: 'choice', passage: 'Reminder: physical fitness test on Monday. Wear sports clothes and bring water.', q: 'What is NOT mentioned?', opts: ['Sports clothes', 'Water', 'The day of the test', 'The location of the test'], a: 3 },
      { t: 'type', passage: 'The convoy departs at 0530. Drivers must be at the motor pool 30 minutes earlier.', q: 'A que horas os motoristas devem chegar? (formato 0000)', a: ['0500', '05:00', '5:00', '5'] },
    ],
  },
  {
    id: 'R2a', skill: 'R', lvl: 2, titulo: 'Memorando interno', desc: 'Normas e mudanças',
    ex: [
      { t: 'choice', passage: 'MEMORANDUM\nSubject: New duty roster procedures\nEffective 1 March, requests to change duty dates must be submitted at least 72 hours in advance through the section chief. Last-minute changes will only be accepted in cases of medical emergency or official travel.', q: 'What is the purpose of the memo?', opts: ['To cancel all duties', 'To explain new rules for changing duty dates', 'To announce official travel', 'To report a medical emergency'], a: 1 },
      { t: 'choice', passage: 'MEMORANDUM\nSubject: New duty roster procedures\nEffective 1 March, requests to change duty dates must be submitted at least 72 hours in advance through the section chief. Last-minute changes will only be accepted in cases of medical emergency or official travel.', q: 'Who receives the requests?', opts: ['The commander', 'The medical officer', 'The section chief', 'The duty officer'], a: 2 },
      { t: 'choice', passage: 'MEMORANDUM\nSubject: New duty roster procedures\nEffective 1 March, requests to change duty dates must be submitted at least 72 hours in advance through the section chief. Last-minute changes will only be accepted in cases of medical emergency or official travel.', q: 'Which last-minute request would be accepted?', opts: ['A birthday party', 'Official travel', 'A football match', 'Being tired'], a: 1 },
      { t: 'choice', q: 'In the memo, "effective 1 March" means:', opts: ['It worked well on 1 March', 'The rule starts on 1 March', 'The rule ends on 1 March', 'It was written on 1 March'], a: 1 },
      { t: 'match', pairs: [['in advance', 'com antecedência'], ['submit', 'enviar/entregar'], ['duty roster', 'escala de serviço'], ['request', 'pedido']] },
    ],
  },
  {
    id: 'R2b', skill: 'R', lvl: 2, titulo: 'Notícia', desc: 'Apoio em desastre natural',
    ex: [
      { t: 'choice', passage: 'Army engineers rebuilt two bridges and cleared more than 40 kilometers of roads after floods hit the region last week. The work allowed food and medicine to reach isolated communities. According to local authorities, around 3,000 families were affected.', q: 'What is the main topic?', opts: ['A new military base', 'Army support after floods', 'A training exercise', 'A road accident'], a: 1 },
      { t: 'choice', passage: 'Army engineers rebuilt two bridges and cleared more than 40 kilometers of roads after floods hit the region last week. The work allowed food and medicine to reach isolated communities. According to local authorities, around 3,000 families were affected.', q: 'Why was the work important?', opts: ['It created jobs', 'It allowed supplies to reach isolated areas', 'It stopped the rain', 'It reduced traffic'], a: 1 },
      { t: 'choice', passage: 'Army engineers rebuilt two bridges and cleared more than 40 kilometers of roads after floods hit the region last week. The work allowed food and medicine to reach isolated communities. According to local authorities, around 3,000 families were affected.', q: 'Who gave the number of affected families?', opts: ['The engineers', 'The journalists', 'Local authorities', 'The families'], a: 2 },
      { t: 'type', passage: 'Army engineers rebuilt two bridges and cleared more than 40 kilometers of roads after floods hit the region last week.', q: 'Quantas pontes foram reconstruídas? (número)', a: ['2', 'two'] },
    ],
  },
  {
    id: 'R3a', skill: 'R', lvl: 3, titulo: 'Editorial: defesa cibernética', desc: 'Tese, tom e vocabulário em contexto',
    ex: [
      { t: 'choice', passage: 'For decades, defense budgets were measured in tanks, ships and aircraft. Today, a single compromised password can paralyze a logistics network more effectively than a missile. Yet many institutions still treat cyber defense as a technical niche rather than a command responsibility. This mindset is not merely outdated; it is dangerous.', q: 'What is the author\'s main argument?', opts: ['Tanks are no longer useful', 'Cyber defense should be a leadership responsibility', 'Passwords should be eliminated', 'Defense budgets are too high'], a: 1 },
      { t: 'choice', passage: 'For decades, defense budgets were measured in tanks, ships and aircraft. Today, a single compromised password can paralyze a logistics network more effectively than a missile. Yet many institutions still treat cyber defense as a technical niche rather than a command responsibility. This mindset is not merely outdated; it is dangerous.', q: 'What is the tone of the last sentence?', opts: ['Humorous', 'Neutral', 'Critical and alarmed', 'Optimistic'], a: 2 },
      { t: 'choice', passage: 'Yet many institutions still treat cyber defense as a technical niche rather than a command responsibility.', q: 'In this context, "niche" means:', opts: ['A specialized, limited area', 'A main priority', 'A type of weapon', 'A government office'], a: 0 },
      { t: 'choice', passage: 'Today, a single compromised password can paralyze a logistics network more effectively than a missile.', q: 'Why does the author compare a password to a missile?', opts: ['To show missiles are cheap', 'To emphasize the potential impact of cyber attacks', 'To criticize logistics officers', 'To describe a real attack'], a: 1 },
    ],
  },
  {
    id: 'R3b', skill: 'R', lvl: 3, titulo: 'Interoperabilidade', desc: 'Inferência e intenção do autor',
    ex: [
      { t: 'choice', passage: 'Interoperability is often discussed in terms of compatible equipment and common standards. These are necessary, but they are not sufficient. A coalition can share the same radios and still fail if its officers cannot negotiate, clarify ambiguity and build rapport across languages. In that sense, language proficiency is not a soft skill; it is operational capability.', q: 'Which statement would the author most likely agree with?', opts: ['Common equipment guarantees interoperability', 'Language skills are a real operational asset', 'Soft skills are more important than equipment', 'Coalitions should use only one language'], a: 1 },
      { t: 'choice', passage: 'Interoperability is often discussed in terms of compatible equipment and common standards. These are necessary, but they are not sufficient.', q: '"Necessary, but not sufficient" means that equipment and standards are:', opts: ['Useless', 'Required, but not enough alone', 'Enough to succeed', 'Too expensive'], a: 1 },
      { t: 'choice', passage: 'A coalition can share the same radios and still fail if its officers cannot negotiate, clarify ambiguity and build rapport across languages.', q: '"Build rapport" is closest in meaning to:', opts: ['Write reports', 'Create good relationships', 'Give orders', 'Fix equipment'], a: 1 },
      { t: 'choice', passage: 'In that sense, language proficiency is not a soft skill; it is operational capability.', q: 'What is the author trying to do with this sentence?', opts: ['Reclassify language skills as essential', 'Criticize language teachers', 'Describe a specific mission', 'Recommend new radios'], a: 0 },
    ],
  },

  /* ============================ ESCREVER ============================ */
  {
    id: 'W1a', skill: 'W', lvl: 1, titulo: 'Frases básicas', desc: 'Monte frases simples',
    ex: [
      { t: 'build', pt: 'Eu sou sargento.', a: 'I am a sergeant', extra: ['is', 'the'] },
      { t: 'build', pt: 'Nós trabalhamos no quartel.', a: 'We work at the barracks', extra: ['works', 'in'] },
      { t: 'build', pt: 'A reunião é às 10 horas.', a: 'The meeting is at ten', extra: ['on', 'are'] },
      { t: 'type', q: 'Traduza: "Meu nome é Carlos."', a: ['my name is carlos', "my name's carlos"] },
      { t: 'build', pt: 'Onde fica o portão principal?', a: 'Where is the main gate', extra: ['what', 'are'] },
      { t: 'type', q: 'Traduza: "Eu moro em Manaus."', a: ['i live in manaus'] },
    ],
  },
  {
    id: 'W1b', skill: 'W', lvl: 1, titulo: 'Bilhetes e formulários', desc: 'Preencher e avisar',
    ex: [
      { t: 'type', q: 'Complete: "I ___ at the hospital yesterday." (verbo be no passado)', a: ['was'] },
      { t: 'type', q: 'Complete: "She ___ English very well." (speak, presente)', a: ['speaks'] },
      { t: 'build', pt: 'Não posso ir à reunião hoje.', a: 'I cannot go to the meeting today', extra: ['can', 'went'] },
      { t: 'build', pt: 'Por favor, me ligue amanhã.', a: 'Please call me tomorrow', extra: ['yesterday', 'calls'] },
      { t: 'write', prompt: 'Escreva um bilhete curto (em inglês) avisando um colega que você vai se atrasar para a instrução e por quê.', min: 12, keys: ['late', 'because', 'sorry', 'training', 'will'], model: 'Hi Marcos, I will be late for the training today because my car broke down. I will arrive at 0830. Sorry!' },
    ],
  },
  {
    id: 'W2a', skill: 'W', lvl: 2, titulo: 'E-mail formal', desc: 'Pedir, justificar, agradecer',
    ex: [
      { t: 'choice', q: 'Which is the best opening for a formal email to a superior you do not know?', opts: ['Hey!', 'Dear Major Smith,', 'Yo, Major', 'Hi buddy,'], a: 1 },
      { t: 'choice', q: 'Which is the most appropriate closing?', opts: ['See ya', 'Love,', 'Kind regards,', 'Bye bye'], a: 2 },
      { t: 'build', pt: 'Gostaria de solicitar três dias de licença.', a: 'I would like to request three days of leave', extra: ['want', 'requesting'] },
      { t: 'write', prompt: 'Escreva um e-mail formal (em inglês) ao seu chefe de seção pedindo três dias de dispensa. Inclua saudação, motivo, datas e despedida.', min: 40, keys: ['dear', 'request', 'leave', 'because', 'from', 'regards'], model: 'Dear Major Smith,\n\nI would like to request three days of leave from 10 to 12 June because I need to help my family move to a new house. My duties will be covered by Lieutenant Alves, who has already agreed. Please let me know if you need any further information.\n\nKind regards,\nLt Souza' },
    ],
  },
  {
    id: 'W2b', skill: 'W', lvl: 2, titulo: 'Relatório de ocorrência', desc: 'Fatos em ordem, no passado',
    ex: [
      { t: 'type', q: 'Complete com o passado: "The patrol ___ (leave) the base at 0600."', a: ['left'] },
      { t: 'type', q: 'Complete com o passado: "We ___ (find) a damaged vehicle on the road."', a: ['found'] },
      { t: 'build', pt: 'Ninguém ficou ferido no acidente.', a: 'Nobody was injured in the accident', extra: ['were', 'on'] },
      { t: 'write', prompt: 'Escreva um relatório curto (em inglês) sobre uma viatura que quebrou durante um comboio. Diga quando, onde, o que aconteceu e o que foi feito.', min: 45, keys: ['at', 'on', 'was', 'because', 'then', 'no one', 'nobody', 'repaired', 'towed'], model: 'At 1430 on 5 May, during the convoy to Camp Bravo, one of the trucks broke down on Route 3 because of an engine problem. Nobody was injured. The convoy stopped for 20 minutes, and then the vehicle was towed to the nearest checkpoint. The mechanics repaired it the following morning.' },
    ],
  },
  {
    id: 'W3a', skill: 'W', lvl: 3, titulo: 'Parágrafo argumentativo', desc: 'Tese, argumentos e conclusão',
    ex: [
      { t: 'choice', q: 'Which connector shows a consequence?', opts: ['Therefore,', 'Although', 'For instance,', 'Meanwhile,'], a: 0 },
      { t: 'choice', q: 'Which sentence is the best thesis statement?', opts: ['Languages are interesting.', 'Language training should be a priority because it directly improves operational effectiveness.', 'I like English.', 'Some officers speak English.'], a: 1 },
      { t: 'write', prompt: 'Escreva um parágrafo argumentativo (em inglês): "Should the Army invest more in distance learning?" Apresente uma tese, dois argumentos, um contra-argumento e uma conclusão.', min: 80, keys: ['in my view', 'i believe', 'firstly', 'moreover', 'however', 'therefore', 'in conclusion', 'although'], model: 'In my view, the Army should invest more in distance learning. Firstly, it allows personnel in remote garrisons to access the same courses as those in large cities. Moreover, it reduces travel costs and time away from the unit. However, some skills, such as tactical drills, cannot be learned online. Therefore, distance learning should complement, not replace, in-person training. In conclusion, a blended approach would make education more accessible and efficient.' },
    ],
  },
  {
    id: 'W3b', skill: 'W', lvl: 3, titulo: 'Proposta formal', desc: 'Problema, solução e justificativa',
    ex: [
      { t: 'choice', q: 'Which phrase is most suitable for a formal recommendation?', opts: ['You gotta do this.', 'It is recommended that the unit adopt...', 'Just do it.', 'Maybe whatever works.'], a: 1 },
      { t: 'build', pt: 'Recomenda-se que o programa seja ampliado.', a: 'It is recommended that the program be expanded', extra: ['is', 'will'] },
      { t: 'write', prompt: 'Escreva um memorando (em inglês) ao comandante propondo um programa de idiomas na sua OM. Descreva o problema, a proposta, os benefícios e os recursos necessários.', min: 90, keys: ['propose', 'recommend', 'currently', 'benefit', 'would', 'therefore', 'resources', 'in addition'], model: 'Subject: Proposal for a language training program\n\nSir, currently only a small number of our officers meet the language requirements for international missions. I propose a six-month program with two weekly online sessions and a monthly practice day. This would improve our readiness for multinational exercises and increase the number of qualified candidates. In addition, the cost would be low, since it would use existing classrooms and free online resources. Therefore, I recommend that the program start next semester.' },
    ],
  },
];

export function licoesDaSkill(skill) {
  return LICOES.filter(l => l.skill === skill);
}
