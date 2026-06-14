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

    // --- COMMANDE !faq ---
    if (message.content === '!faq') {
        const faqEmbed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('📋 FAQ')
            .setDescription('Cliquez sur une catégorie ci-dessous.');

        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('faq_commander').setLabel('Comment commander').setEmoji('🛍️').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq_liens').setLabel('Liens').setEmoji('🔗').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq_spreadsheet').setLabel('Spreadsheet').setEmoji('🛒').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq_colis').setLabel('Colis d\'essai').setEmoji('⚖️').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq_ligne').setLabel('Meilleure ligne').setEmoji('🚛').setStyle(ButtonStyle.Primary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('faq_assurance').setLabel('Assurance').setEmoji('📋').setStyle(ButtonStyle.Primary)
        );

        await message.channel.send({ embeds: [faqEmbed], components: [row1, row2] });
        await message.delete();
    }

    // --- COMMANDE !faq2 ---
    if (message.content === '!faq2') {
        const faq2Embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle('📋 FAQ 2')
            .setDescription('Cliquez sur une catégorie pour voir la réponse.');

        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('faq2_processus').setLabel('Le processus').setEmoji('🔄').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq2_qualite').setLabel('Qualité article').setEmoji('🔎').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq2_commander').setLabel('Commander').setEmoji('🛍️').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq2_balance').setLabel('Balance').setEmoji('💰').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq2_etapes').setLabel('Étapes commande').setEmoji('📋').setStyle(ButtonStyle.Primary)
        );

        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('faq2_preparation').setLabel('Préparation').setEmoji('🎁').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq2_suivi').setLabel('Suivi colis').setEmoji('🚚').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq2_reception').setLabel('Réception').setEmoji('📦').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('faq2_saisie').setLabel('Saisi/Vol').setEmoji('⚠️').setStyle(ButtonStyle.Danger)
        );

        await message.channel.send({ embeds: [faq2Embed], components: [row1, row2] });
        await message.delete();
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    // On prévient Discord qu'on traite l'action
    await interaction.deferUpdate();

    let texteReponse = '';

    switch (interaction.customId) {
        case 'faq_assurance': texteReponse = "📋 **Assurance :** L'assurance (bbdbuy Care) coûte environ 3-5% de la valeur de ton colis. Elle rembourse 100% de la valeur et des frais de port en cas de perte ou saisie."; break;
        case 'faq_ligne': texteReponse = "🚛 **Meilleure ligne :** Colissi pour les petits colis, UPS/Fedex pour le volumineux, DHL electronic pour l'électronique avec batterie."; break;
        case 'faq_colis': texteReponse = "⚖️ **Colis d'essai (Rehearsal) :** Permet de peser réellement ton colis pour payer le prix exact avant l'expédition."; break;
        case 'faq2_processus': texteReponse = "🏪 **BBDBuy :** Agent intermédiaire. Réception à la Warehouse > Contrôle Qualité (QC) > Livraison avec assurance incluse."; break;
        case 'faq2_qualite': texteReponse = "🔎 **Qualité :** Partage tes liens QC dans le salon dédié pour obtenir l'avis de la communauté."; break;
        case 'faq2_commander': texteReponse = "🛍️ **Commande :** Copie ton lien (Taobao/Weidian/1688) dans la barre de recherche BBDBuy et utilise ta balance pour payer."; break;
        case 'faq2_balance': texteReponse = "💰 **Balance :** Utilise-la pour recharger ton crédit et éviter les frais bancaires lors des paiements."; break;
        case 'faq2_etapes': texteReponse = "📋 **Étapes :** Paiement > Achat > Arrivée Warehouse > QC > Stockage > Expédition."; break;
        case 'faq2_preparation': texteReponse = "🎁 **Préparation :** N'oublie pas l'assurance (4%) et de retirer les boîtes à chaussures pour réduire le poids."; break;
        case 'faq2_suivi': texteReponse = "🚚 **Suivi :** Utilise 17Track dès que ton colis est pris en charge par le transporteur."; break;
        case 'faq2_reception': texteReponse = "📦 **Réception :** Sois présent le jour de la livraison. En cas d'absence, le colis part souvent en point relais."; break;
        case 'faq2_saisie': texteReponse = "🚨 **Saisie/Perte :** Avec l'assurance (4%), tu es dédommagé à 100%. Ouvre un ticket PARCEL sur le serveur."; break;
        default: texteReponse = "Option en cours de finalisation.";
    }

    const reponseEmbed = new EmbedBuilder()
        .setColor(0xED810E)
        .setDescription(texteReponse);

    // Remplace le message précédent par le nouveau
    await interaction.editReply({ embeds: [reponseEmbed], components: [] });
});

client.login(process.env.DISCORD_TOKEN);