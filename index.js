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

    // ==========================================
    // LE MENU DE LA FAQ AVEC BOUTONS ( !faq )
    // ==========================================
    if (message.content === '!faq') {
        const faqEmbed = new EmbedBuilder()
            .setColor(0x5865F2) // Bleu Discord
            .setTitle('📋 FAQ')
            .setDescription('Cliquez sur une catégorie ci-dessous pour voir la réponse associée.');

        // Ligne 1 des boutons (Maximum 5 boutons par ligne)
        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('faq_commander')
                    .setLabel('Comment commander')
                    .setEmoji('🛍️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('faq_liens')
                    .setLabel('Liens')
                    .setEmoji('🔗')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('faq_spreadsheet')
                    .setLabel('Spreadsheet')
                    .setEmoji('🛒')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('faq_colis')
                    .setLabel('Colis d\'essai')
                    .setEmoji('⚖️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('faq_ligne')
                    .setLabel('Meilleure ligne')
                    .setEmoji('🚛')
                    .setStyle(ButtonStyle.Primary)
            );

        // Ligne 2 des boutons
        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('faq_assurance')
                    .setLabel('Assurance')
                    .setEmoji('📋')
                    .setStyle(ButtonStyle.Primary)
            );

        // On envoie le message et on supprime le "!faq" écrit par l'utilisateur
        await message.channel.send({ embeds: [faqEmbed], components: [row1, row2] });
        await message.delete();
    }
});

// ==========================================
// ACTIONS AVEC REMPLACEMENT DYNAMIQUE (PAS DE SPAM)
// ==========================================
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    let texteReponse = '';

    // Détermination du texte selon le bouton cliqué
    switch (interaction.customId) {
        case 'faq_assurance':
            texteReponse = `📋 **Assurance :** L'assurance payante (bbdbuy Care) est une option très abordable puisqu'elle coûte seulement environ 3% à 5% de la valeur totale de votre colis (ce qui représente à peine 3€ à 5€ pour une commande de 100€). Elle est particulièrement recommandée si c'est votre première commande et que vous souhaitez commander l'esprit tranquille.\n\nEn cas de problème majeur durant le transport—que ce soit une perte définitive de votre colis par le livreur ou une saisie à la douane (même si cela reste extrêmement rare)—l'assurance prend tout en charge. Elle vous remboursera 100% de la valeur de vos articles ainsi que l'intégralité des frais de port pour que vous soyez totalement serein.`;
            break;

        case 'faq_ligne':
            texteReponse = `🚛 **Meilleure ligne :**\n✈️ *Quelle ligne de transport choisir pour ton colis ? (Le guide simple)*\n\nBienvenue ! Pour ta commande, le choix de la ligne dépend surtout de ce qu'il y a à l'intérieur de ton colis. Voici comment choisir facilement pour éviter les blocages et payer le juste prix :\n\n👕 **Tu as uniquement des VÊTEMENTS ou des CHAUSSURES ?**\n* Si ton colis est léger (moins de 5 kg) ➔ Choisis **Colissi (French small bag)**. C'est ultra discret, les taxes sont déjà incluses (donc pas de frais de douane à l'arrivée) et c'est ton facteur habituel (La Poste / Colissimo) qui te livre tranquillement chez toi.\n* Si ton colis est gros ou volumineux (grosses doudounes, plein de boîtes de baskets) ➔ Choisis **UPS / Fedex (no limited)**. Cette ligne est magique car elle calcule le prix uniquement sur le poids réel du colis, pas sur la taille du carton. Ça t'évite de payer un supplément pour rien.\n\n🔋 **Tu as de l'ÉLECTRONIQUE (Écouteurs, montres connectées, batteries...) ?**\n* Choisis obligatoirement : **DHL electronic**. Les lignes normales refusent direct les colis qui contiennent des piles ou des batteries à cause des règles de sécurité des avions. Cette ligne est faite exprès pour ça et intègre aussi la sécurité sans douane.\n\n💧 **Tu as du LIQUIDE (Parfums, crèmes...) ?**\n* **Attention :** Les lignes de ma liste (DHL, UPS, Colissimo) interdisent strictement les liquides. Si tu laisses du liquide, ton colis sera bloqué au centre de tri en Chine. Pour ça, il faut utiliser des lignes postales très spécifiques (souvent appelées EUB-Liquid ou PostNL). Si tu n'en as pas dans ta liste, le mieux est de retirer le liquide pour ne pas bloquer le reste de tes affaires.`;
            break;

        case 'faq_colis':
            texteReponse = `⚖️ **C’est quoi le "colis d'essai" (la pré-pesée) et pourquoi l'utiliser ?**\n\nBienvenue ! Quand tu achètes tes articles, le site fait une estimation automatique du poids et de la taille du carton. Parfois, cette estimation est un peu plus lourde que la réalité, ce qui te force à payer des frais de port plus chers au moment de valider (même si le site te rembourse la différence sur ton solde quelques jours plus tard).\n\nPour éviter d'avancer cet argent pour rien, tu peux demander un **Rehearsal** (une simulation d'emballage) :\n1️⃣ Les agents de l'entrepôt vont prendre tes articles et emballer réellement ton colis exactement comme s'il partait pour de bon.\n2️⃣ Ils vont le peser sur la balance et mesurer le carton au centimètre près.\n3️⃣ Le site met à jour ta commande avec le poids et le prix de livraison exacts et définitifs.\n\n🌟 **Pourquoi c'est top pour toi ?**\n* **Pas de surprise :** Tu payes le juste prix immédiatement, sans devoir attendre un remboursement.\n* **Le choix de la ligne :** Ça te permet de vérifier à l'avance si ton colis passe sous la limite de la ligne que tu voulais (par exemple, vérifier que ton colis fait bien moins de 5 kg pour pouvoir prendre la ligne Colissi). Si c'est trop lourd, tu peux ajuster en enlevant une boîte de chaussures par exemple, avant de payer !\n\nC'est une option qui coûte trois fois rien (environ 2-3 €) et ça te permet d'expédier ton tout premier colis l'esprit tranquille.`;
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
    }

    // Création d'un Embed propre pour afficher la réponse sous le menu
    const reponseEmbed = new EmbedBuilder()
        .setColor(0xED810E) // Orange BBDBUY pour les réponses
        .setDescription(texteReponse);

    // Modifie le message directement au lieu d'en rajouter un nouveau (fini l'accumulation !)
    await interaction.update({ 
        embeds: [interaction.message.embeds[0], reponseEmbed], 
        components: interaction.message.components 
    });
});

// METS TON TOKEN DISCORD SECRET ICI
client.login();
