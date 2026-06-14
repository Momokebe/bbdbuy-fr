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
            texteReponse = `⚖️ **C'est quoi le "colis d'essai" (la pré-pesée) et pourquoi l'utiliser ?**\n\nBienvenue ! Quand tu achètes tes articles, le site fait une estimation automatique du poids et de la taille du carton. Parfois, cette estimation est un peu plus lourde que la réalité, ce qui te force à payer des frais de port plus chers au moment de valider (même si le site te rembourse la différence sur ton solde quelques jours plus tard).\n\nPour éviter d'avancer cet argent pour rien, tu peux demander un **Rehearsal** (une simulation d'emballage) :\n1️⃣ Les agents de l'entrepôt vont prendre tes articles et emballer réellement ton colis exactement comme s'il partait pour de bon.\n2️⃣ Ils vont le peser sur la balance et mesurer le carton au centimètre près.\n3️⃣ Le site met à jour ta commande avec le poids et le prix de livraison exacts et définitifs.\n\n🌟 **Pourquoi c'est top pour toi ?**\n* **Pas de surprise :** Tu payes le juste prix immédiatement, sans devoir attendre un remboursement.\n* **Le choix de la ligne :** Ça te permet de vérifier à l'avance si ton colis passe sous la limite de la ligne que tu voulais. Si c'est trop lourd, tu peux ajuster avant de payer !\n\nC'est une option qui coûte trois fois rien (environ 2-3 €) et ça te permet d'expédier ton tout premier colis l'esprit tranquille.`;
            break;

        case 'faq_commander': texteReponse = '🛍️ En cours de finalisation...'; break;
        case 'faq_liens': texteReponse = '🔗 En cours de finalisation...'; break;
        case 'faq_spreadsheet': texteReponse = '🛒 En cours de finalisation...'; break;
        case 'faq2_processus': texteReponse = `🏪 **BBDBuy, c'est quoi ?**\nBBDBuy est un agent qui joue le rôle d'intermédiaire entre toi et les vendeurs chinois. Bonne nouvelle : tu reçois **100$ de coupons** à utiliser lors de ta livraison (non cumulables et basés sur le montant de celle-ci) !`; break;
        case 'faq2_qualite': texteReponse = `🔎 **Comment juger la qualité d'un article ?**\n⭐ Évalue un vendeur avant d'acheter en postant le lien dans le salon dédié. Partage tes photos QC une fois reçues !`; break;
        case 'faq2_commander': texteReponse = `🛍️ **Comment passer commande ?**\n1. Trouve ton article (Spreadsheet/Yupoo).\n2. Copie le lien et colle-le sur BBDBuy.\n3. Paye avec ta balance pour éviter les frais.`; break;
        case 'faq2_balance': texteReponse = `💰 **Utilisation de la balance :** Utilise ton crédit pour commander, cela évite les frais de conversion bancaire lors du paiement par carte.`; break;
        case 'faq2_etapes': texteReponse = `📋 **Étapes de commande :** Paiement → Achat → Warehouse → QC → Stockage → Expédition.`; break;
        case 'faq2_preparation': texteReponse = `🎁 **Préparation :** Va dans Entrepôt, sélectionne tes produits, soumets ton colis. N'oublie pas l'assurance (4%) et de retirer les boîtes à chaussures inutiles !`; break;
        case 'faq2_suivi': texteReponse = `🚚 **Suivi :** Une fois pris en charge, utilise 17Track avec ton numéro de suivi.`; break;
        case 'faq2_reception': texteReponse = `📦 **Réception :** Sois présent le jour de la livraison. En cas d'absence, contacte le transporteur pour convenir d'un point relais.`; break;
        case 'faq2_saisie': texteReponse = `🚨 **Saisie/Perte/Vol :** Avec l'assurance (4%), tu es dédommagé à 100%. Ouvre un ticket PARCEL sur le serveur en cas de problème.`; break;
    }

    const reponseEmbed = new EmbedBuilder()
        .setColor(0xED810E)
        .setDescription(texteReponse || "Contenu en cours de mise à jour.");

    // update() remplace le message précédent par le nouveau
    await interaction.update({
        embeds: [reponseEmbed],
        components: [] // Optionnel : retire les boutons si tu ne veux plus qu'ils soient cliquables après
    });
});