require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`🤖 Le bot ${client.user.tag} est en ligne et prêt !`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!faq') {
        const faqEmbed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('📋 FAQ')
            .setDescription('Cliquez sur une catégorie ci-dessous pour voir la réponse associée.');

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('faq_commander').setLabel('Comment commander').setEmoji('🛍️').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq_liens').setLabel('Liens').setEmoji('🔗').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq_spreadsheet').setLabel('Spreadsheet').setEmoji('🛒').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq_colis').setLabel('Colis d\'essai').setEmoji('⚖️').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq_ligne').setLabel('Meilleure ligne').setEmoji('🚛').setStyle(ButtonStyle.Primary)
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('faq_assurance').setLabel('Assurance').setEmoji('📋').setStyle(ButtonStyle.Primary)
            );

        await message.channel.send({ embeds: [faqEmbed], components: [row1, row2] });
        await message.delete();
    }

    if (message.content === '!faq2') {
        const faq2Embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('📋 FAQ')
            .setDescription('Cliquez sur une catégorie ci-dessous pour voir la réponse associée.');

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('faq2_processus').setLabel('Le processus').setEmoji('🔄').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq2_qualite').setLabel('Qualité article').setEmoji('🔎').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq2_commander').setLabel('Commander').setEmoji('🛍️').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq2_balance').setLabel('Balance').setEmoji('💰').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq2_etapes').setLabel('Étapes commande').setEmoji('📋').setStyle(ButtonStyle.Primary)
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('faq2_preparation').setLabel('Préparation colis').setEmoji('🎁').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq2_suivi').setLabel('Suivi colis').setEmoji('🚚').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq2_reception').setLabel('Réception colis').setEmoji('📦').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('faq2_saisie').setLabel('Saisi - Perte - Vol').setEmoji('⚠️').setStyle(ButtonStyle.Danger)
            );

        await message.channel.send({ embeds: [faq2Embed], components: [row1, row2] });
        await message.delete();
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    let texteReponse = '';

    switch (interaction.customId) {
        case 'faq_assurance':
            texteReponse = `📋 **Assurance :** L'assurance payante (bbdbuy Care) est une option très abordable puisqu'elle coûte seulement environ 3% à 5% de la valeur totale de votre colis (ce qui représente à peine 3€ à 5€ pour une commande de 100€). Elle est particulièrement recommandée si c'est votre première commande et que vous souhaitez commander l'esprit tranquille.\n\nEn cas de problème majeur durant le transport—que ce soit une perte définitive de votre colis par le livreur ou une saisie à la douane (même si cela reste extrêmement rare)—l'assurance prend tout en charge. Elle vous remboursera 100% de la valeur de vos articles ainsi que l'intégralité des frais de port pour que vous soyez totalement serein.`;
            break;

        case 'faq_ligne':
            texteReponse = `🚛 **Meilleure ligne :**\n✈️ *Quelle ligne de transport choisir pour ton colis ? (Le guide simple)*\n\nBienvenue ! Pour ta commande, le choix de la ligne dépend surtout de ce qu'il y a à l'intérieur de ton colis. Voici comment choisir facilement pour éviter les blocages et payer le juste prix :\n\n👕 **Tu as uniquement des VÊTEMENTS ou des CHAUSSURES ?**\n* Si ton colis est léger (moins de 5 kg) ➔ Choisis **Colissi (French small bag)**. C'est ultra discret, les taxes sont déjà incluses (donc pas de frais de douane à l'arrivée) et c'est ton facteur habituel (La Poste / Colissimo) qui te livre tranquillement chez toi.\n* Si ton colis est gros ou volumineux (grosses doudounes, plein de boîtes de baskets) ➔ Choisis **UPS / Fedex (no limited)**. Cette ligne est magique car elle calcule le prix uniquement sur le poids réel du colis, pas sur la taille du carton. Ça t'évite de payer un supplément pour rien.\n\n🔋 **Tu as de l'ÉLECTRONIQUE (Écouteurs, montres connectées, batteries...) ?**\n* Choisis obligatoirement : **DHL electronic**. Les lignes normales refusent direct les colis qui contiennent des piles ou des batteries à cause des règles de sécurité des avions. Cette ligne est faite exprès pour ça et intègre aussi la sécurité sans douane.\n\n💧 **Tu as du LIQUIDE (Parfums, crèmes...) ?**\n* **Attention :** Les lignes de ma liste (DHL, UPS, Colissimo) interdisent strictement les liquides. Si tu laisses du liquide, ton colis sera bloqué au centre de tri en Chine. Pour ça, il faut utiliser des lignes postales très spécifiques (souvent appelées EUB-Liquid ou PostNL). Si tu n'en as pas dans ta liste, le mieux est de retirer le liquide pour ne pas bloquer le reste de tes affaires.`;
            break;

        case 'faq_colis':
            texteReponse = `⚖️ **C'est quoi le "colis d'essai" (la pré-pesée) et pourquoi l'utiliser ?**\n\nBienvenue ! Quand tu achètes tes articles, le site fait une estimation automatique du poids et de la taille du carton. Parfois, cette estimation est un peu plus lourde que la réalité, ce qui te force à payer des frais de port plus chers au moment de valider (même si le site te rembourse la différence sur ton solde quelques jours plus tard).\n\nPour éviter d'avancer cet argent pour rien, tu peux demander un **Rehearsal** (une simulation d'emballage) :\n1️⃣ Les agents de l'entrepôt vont prendre tes articles et emballer réellement ton colis exactement comme s'il partait pour de bon.\n2️⃣ Ils vont le peser sur la balance et mesurer le carton au centimètre près.\n3️⃣ Le site met à jour ta commande avec le poids et le prix de livraison exacts et définitifs.\n\n🌟 **Pourquoi c'est top pour toi ?**\n* **Pas de surprise :** Tu payes le juste prix immédiatement, sans devoir attendre un remboursement.\n* **Le choix de la ligne :** Ça te permet de vérifier à l'avance si ton colis passe sous la limite de la ligne que tu voulais (par exemple, vérifier que ton colis fait bien moins de 5 kg pour pouvoir prendre la ligne Colissi). Si c'est trop lourd, tu peux ajuster en enlevant une boîte de chaussures par exemple, avant de payer !\n\nC'est une option qui coûte trois fois rien (environ 2-3 €) et ça te permet d'expédier ton tout premier colis l'esprit tranquille.`;
            break;

        case 'faq_commander':
            texteReponse = '🛍️ En cours de finalisation...';
            break;

        case 'faq_liens':
            texteReponse = '🔗 En cours de finalisation...';
            break;

        case 'faq_spreadsheet':
            texteReponse = '🛒 En cours de finalisation...';
            break;

        case 'faq2_processus':
            texteReponse = `🏪 **BBDBuy, c'est quoi ?**
BBDBuy est un agent qui joue le rôle d'intermédiaire entre toi et les vendeurs chinois. Bonne nouvelle : tu reçois **100$ de coupons** à utiliser lors de ta livraison (non cumulables et basés sur le montant de celle-ci) !

🔍 **Trouver & commander un article**
Tu ne sais pas comment trouver un article ou passer ta première commande ? Pas de panique ! Consulte l'explicatif **COMMANDER** et suis les étapes une par une.

⚙️ **BBDBuy s'occupe de tout**
Une fois ta commande passée, BBDBuy achète l'article à ta place auprès du vendeur, qui l'envoie ensuite directement à leur entrepôt. Pour mieux comprendre chaque étape, jette un œil à **ÉTAPES COMMANDE**.

📦 **Arrivée à l'entrepôt (WH)**
Dès que ton article arrive à l'entrepôt, tu reçois un mail ! BBDBuy effectue un contrôle qualité (QC) avec des photos pour que tu puisses vérifier que tout est conforme. Si ça te convient ✅ → tu passes à la livraison. Si non ❌ → tu peux demander un remboursement via **RESTITUTION**. Attention : ton article peut rester **maximum 90 jours** en entrepôt, après ce délai il ne t'appartiendra plus ! ⏳

🚚 **La livraison**
Ton article est prêt à partir ? C'est le moment d'utiliser ton coupon ! Note que **8,99€ de frais de dossier** sont inclus pour le premier kilo. Pour estimer le coût selon le poids, consulte **LIGNE** et l'explicatif **HAUSSE EXPÉDITION**. Une **assurance tous risques** est incluse et aucune déclaration n'est nécessaire sur BBDBuy 🎉`;
            break;

        case 'faq2_qualite':
            texteReponse = `🔎 **Comment juger la qualité d'un article ?**

⭐ **Évaluer un vendeur avant d'acheter**
Tu veux savoir si un vendeur est fiable avant de passer commande ? Colle le lien de ton article (**Taobao / Weidian / 1688**) directement dans ce salon → https://discord.com/channels/1493015399262978219/1493022170790629406 et la communauté t'aidera à juger ! 🙌

📸 **Partager ton contrôle qualité (QC)**
Tu as reçu tes photos de contrôle qualité de BBDBuy ? Partage-les avec la communauté dans le salon dédié → https://discord.com/channels/1493015399262978219/1515361848315351180
⚠️ Merci de bien respecter les modalités de publication du salon !

⚠️ **Important à savoir**
BBDBuy agit uniquement en tant qu'**intermédiaire** entre toi et le vendeur. Il n'est pas responsable de la qualité des produits ni des éventuels problèmes avec les vendeurs, y compris les remboursements. Garde cela en tête avant de passer commande ! 🙏`;
            break;

        case 'faq2_commander':
            texteReponse = `🛍️ **Comment passer commande ?**

🔍 **Étape 1 — Trouver ton article**
- 📊 Ma **spreadsheet** → https://discord.com/channels/1493015399262978219/1515328874655907850
- 📸 **Yupoo** — le catalogue des vendeurs, accessible via une recherche sur le serveur ou sur Google
- ✅ Les salons **QC** du serveur

🔗 **Étape 2 — Utiliser ton lien**
Copie le lien (**Taobao / Weidian / 1688**) et colle-le dans la barre de recherche de BBDBuy. Si le lien est trop long, convertis-le ici → https://discord.com/channels/1493015399262978219/1515335026919866389 🔄

💳 **Étape 3 — Payer ta commande**
- 🛒 **"Acheter plus / Purchase More"** → pour grouper tes articles
- ⚡ **"Acheter maintenant / Buy it now"** → pour un paiement immédiat

💡 **Conseil :** Privilégie toujours ta **Balance BBDBuy** pour éviter les frais bancaires ! 💰`;
            break;

        case 'faq2_balance':
            texteReponse = `💰 **Comment utiliser ta balance BBDBuy ?**

Tu as de l'argent sur ta balance ? Cela peut venir de :
- 🔄 Un article **annulé / cancelled**
- ✅ Un **remboursement accepté** par le vendeur
- ➕ Un **rechargement manuel**

🛍️ **Commander un nouvel article**
Utilise ton crédit pour commander ! Assure-toi que l'article est **disponible chez le vendeur**.

⏳ **Garder pour plus tard**
Ton argent reste disponible pour de **futures commandes ou livraisons** !

🏦 **Retirer ton argent**
Tu peux effectuer un **retrait** directement depuis ton compte BBDBuy.

💡 **Notre conseil**
Recharge ta **balance** plutôt que d'utiliser ta carte bancaire — les **frais de conversion sont beaucoup moins élevés** ! 💸`;
            break;

        case 'faq2_etapes':
            texteReponse = `📋 **Les étapes de ta commande BBDBuy**

💳 **"En attente de paiement"**
Finalise ton paiement pour que BBDBuy puisse prendre en charge ton article !

✅ **"Payé"**
Ton paiement est confirmé ! BBDBuy s'apprête à acheter ton article auprès du vendeur.

📦 **"En attente d'expédition"**
Le vendeur prépare ton colis. ⏳ Comptez **2 à 7 jours**.
*(Si ton article met plus de 7 jours, le vendeur n'avait probablement plus de stock. Nous te conseillons de demander un remboursement.)* 💡

🚚 **"En route vers la Warehouse"**
Ton article est en chemin vers l'entrepôt BBDBuy ! 😊

🔍 **"En attente de QC"**
BBDBuy prendra des **photos de ton article** et te les enverra ! 📸 Tu pourras ensuite **valider** ✅ ou **refuser** ❌ ton produit.

🏠 **"Stocké"**
Le QC est terminé ! Ton article est stocké et prêt à être expédié 🎉`;
            break;

        case 'faq2_preparation':
            texteReponse = `🎁 **Comment bien préparer ton colis ?**

**Étapes sur BBDBuy :**
1️⃣ Va dans **Entrepôt**
2️⃣ Clique sur **Colis soumettable**
3️⃣ Sélectionne tes **produits**
4️⃣ Clique sur **Soumettre** ✅

🛡️ **Protections disponibles**
🔒 **Assurance** — **4% du montant** *(recommandée)*
🧽 **Renforcement mousse** — **0,40€**
📐 **Coins de protection** — **0,66€** *(colis fragiles)*
👟 **Embauchoirs** — **1,33€** *(si besoin)*

📦 **Articles volumineux**
🗑️ **Retirer la boîte à chaussures** — **Gratuit** ✅ *(fortement recommandé)*
📦 **Boîte pliante** — **0,66€** *(si tu veux garder la boîte)*
🌬️ **Sac sous vide** — *(fortement recommandé pour les vêtements)*

⚠️ **Important**
❌ Ne mélange **jamais** vêtements + électronique + liquides !
💡 Privilégie des colis de **plus de 2 kg** pour optimiser le coût ! 💰`;
            break;

        case 'faq2_suivi':
            texteReponse = `🚚 **Comment suivre ton colis ?**

**UPS / DHL / DPD / Colis Privé / Colissimo**
Utilise le salon https://discord.com/channels/1493015399262978219/1515748552268316744 jusqu'à la prise en charge, puis passe sur **17Track** ! 📍

🔢 **Tu as un numéro de suivi sur BBDBuy ?**
Rends-toi sur **17Track** et sélectionne le **transporteur choisi** ! 🌍

⏳ **Sois patient !**
Un délai de **1 à 2 jours** peut s'écouler avant la mise à jour du suivi. Une fois pris en charge, toutes les infos seront disponibles sur **17Track** ! 📱

📍 **Délai de livraison**
L'arrivée dépend de ta **localisation**. BBDBuy ne contrôle pas le flux logistique mais fait tout pour que ton colis arrive dans les meilleures conditions ! 😊`;
            break;

        case 'faq2_reception':
            texteReponse = `📦 **Comment bien réceptionner son colis ?**

Assure-toi d'être **disponible le jour prévu** de livraison ! 📅

🟤 **UPS / DPD**
En cas d'absence, ton colis est automatiquement redirigé en **point relais**. Contacte ton transporteur **dès la prise en charge** pour modifier si besoin. 😊

🔵 **Colissimo / Colis Privé / DHL / EMS**
Contacte le **service client** dès la prise en charge pour :
- 📍 Modifier l'adresse de livraison
- 🏪 Choisir un **point relais** proche

⚠️ **Attention !** Ne pas agir rapidement peut entraîner un **retour chez l'expéditeur** ou une **saisie** de ton colis ! ⏳`;
            break;

        case 'faq2_saisie':
            texteReponse = `🚨 **Que faire en cas de saisie, perte ou vol ?**

🛡️ **L'assurance avant tout !**
**(4% du montant)** te couvre **intégralement**. Sans assurance, dédommagement limité à **6€/kg**. On te recommande fortement de la prendre ! 💡

🔴 **Colis saisi**
1️⃣ Ouvre un ticket **PARCEL** sur le serveur officiel
2️⃣ Tu seras dédommagé selon ton assurance ✅

📭 **Colis perdu**
1️⃣ Réclame un **certificat de perte** à la société logistique
2️⃣ Rassemble tes **justificatifs**
3️⃣ Ouvre un ticket **PARCEL** ✅

🦹 **Colis volé**
1️⃣ Contacte ton **transporteur** pour localiser le colis
2️⃣ Réclame un **certificat de vol**
3️⃣ Ouvre un ticket **PARCEL** avec tes preuves ✅`;
            break;
    }

    const reponseEmbed = new EmbedBuilder()
        .setColor(0xED810E)
        .setDescription(texteReponse);

    await interaction.reply({
        embeds: [reponseEmbed],
        ephemeral: true
    });
});

client.login(process.env.DISCORD_TOKEN);