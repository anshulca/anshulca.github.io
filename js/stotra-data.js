/* =========================================================================
   NAAM JAP · STOTRA / CHALISA DATA
   Full devotional texts with Devanagari and English transliteration.
   Each entry: { id, name, nameDev, deity, deityDev, type, verses[], meaning? }
   verses: [{ label?, dev, en }]   — label marks doha/chaupai/verse sections
   ========================================================================= */
(function (global) {
  'use strict';

  var STOTRAS = [

    /* ==================================================================
       HANUMAN
       ================================================================== */
    {
      id: 'hanuman-chalisa',
      name: 'Hanuman Chalisa',
      nameDev: 'हनुमान चालीसा',
      deity: 'hanuman',
      deityName: 'Hanuman',
      deityDev: 'हनुमान',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि ।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि ॥', en: 'Shrī Guru charana saroja raja, nija manu mukuru sudhāri,\nBaranau Raghubara bimala jasu, jo dāyaku phala chāri.' },
        { label: 'Doha', dev: 'बुद्धिहीन तनु जानिके, सुमिरौं पवनकुमार ।\nबल बुद्धि विद्या देहु मोहिं, हरहु कलेस विकार ॥', en: 'Buddhihīna tanu jānike, sumirau Pavana Kumāra,\nBala buddhi vidyā dehu mohiṁ, harahu kalesa vikāra.' },
        { label: 'Chaupai', dev: 'जय हनुमान ज्ञान गुन सागर ।\nजय कपीस तिहुँ लोक उजागर ॥', en: 'Jaya Hanumāna gyāna guna sāgara,\nJaya Kapīsha tihuṁ loka ujāgara.' },
        { dev: 'रामदूत अतुलित बलधामा ।\nअंजनि पुत्र पवनसुत नामा ॥', en: 'Rāmadūta atulita baladhamā,\nAnjanī putra Pavanasuta nāmā.' },
        { dev: 'महाबीर बिक्रम बजरंगी ।\nकुमति निवार सुमति के संगी ॥', en: 'Mahābīra bikrama Bajarangī,\nKumati nivāra sumati ke sangī.' },
        { dev: 'कंचन बरन बिराज सुबेसा ।\nकानन कुंडल कुंचित केसा ॥', en: 'Kanchana barana birāja subesā,\nKānana kuṇḍala kuṇchita kesā.' },
        { dev: 'हाथ बज्र औ ध्वजा बिराजै ।\nकाँधे मूँज जनेऊ साजै ॥', en: 'Hātha bajra au dhvajā birājai,\nKāṁdhe mūṁja janeu sājai.' },
        { dev: 'शंकर सुवन केसरी नंदन ।\nतेज प्रताप महा जग बंदन ॥', en: 'Shaṅkara suvana Kesarī Nandana,\nTeja pratāpa mahā jaga bandana.' },
        { dev: 'विद्यावान गुनी अति चातुर ।\nराम काज करिबे को आतुर ॥', en: 'Vidyāvāna gunī ati chātura,\nRāma kāja karibe ko ātura.' },
        { dev: 'प्रभु चरित्र सुनिबे को रसिया ।\nराम लखन सीता मन बसिया ॥', en: 'Prabhu charitra sunibe ko rasiyā,\nRāma Lakhana Sītā mana basiyā.' },
        { dev: 'सूक्ष्म रूप धरि सियहिं दिखावा ।\nबिकट रूप धरि लंक जरावा ॥', en: 'Sūkshma rūpa dhari Siyahiṁ dikhāvā,\nBikaṭa rūpa dhari Laṅka jarāvā.' },
        { dev: 'भीम रूप धरि असुर सँहारे ।\nरामचन्द्र के काज सँवारे ॥', en: 'Bhīma rūpa dhari asura saṁhāre,\nRāmachandra ke kāja saṁvāre.' },
        { dev: 'लाय सजीवन लखन जियाये ।\nश्रीरघुबीर हरषि उर लाये ॥', en: 'Lāya Sajīvana Lakhana jiyāye,\nShrī Raghubīra harashi ura lāye.' },
        { dev: 'रघुपति कीन्हीं बहुत बड़ाई ।\nतुम मम प्रिय भरतहि सम भाई ॥', en: 'Raghupati kīnhīṁ bahuta baḍāī,\nTuma mama priya Bharatahi sama bhāī.' },
        { dev: 'सहस बदन तुम्हरो जस गावैं ।\nअस कहि श्रीपति कंठ लगावैं ॥', en: 'Sahasa badana tumharo jasa gāvaiṁ,\nAsa kahi Shrīpati kaṇṭha lagāvaiṁ.' },
        { dev: 'सनकादिक ब्रह्मादि मुनीसा ।\nनारद शारद सहित अहीसा ॥', en: 'Sanakādika Brahmādi munīsā,\nNārada Shārada sahita Ahīsā.' },
        { dev: 'जम कुबेर दिगपाल जहाँ ते ।\nकबि कोबिद कहि सके कहाँ ते ॥', en: 'Jama Kubera Digapāla jahāṁ te,\nKabi kobida kahi sake kahāṁ te.' },
        { dev: 'तुम उपकार सुग्रीवहिं कीन्हा ।\nराम मिलाय राजपद दीन्हा ॥', en: 'Tuma upakāra Sugrīvahiṁ kīnhā,\nRāma milāya rājapada dīnhā.' },
        { dev: 'तुम्हरो मंत्र विभीषन माना ।\nलंकेश्वर भए सब जग जाना ॥', en: 'Tumharo mantra Vibhīshana mānā,\nLaṅkeśvara bhae saba jaga jānā.' },
        { dev: 'जुग सहस्र जोजन पर भानू ।\nलील्यो ताहि मधुर फल जानू ॥', en: 'Juga sahasra yojana para Bhānū,\nLīlyo tāhi madhura phala jānū.' },
        { dev: 'प्रभु मुद्रिका मेलि मुख माहीं ।\nजलधि लाँघि गये अचरज नाहीं ॥', en: 'Prabhu mudrikā meli mukha māhīṁ,\nJaladhi lāṁghi gaye acharaja nāhīṁ.' },
        { dev: 'दुर्गम काज जगत के जेते ।\nसुगम अनुग्रह तुम्हरे तेते ॥', en: 'Durgama kāja jagata ke jete,\nSugama anugraha tumhare tete.' },
        { dev: 'राम दुआरे तुम रखवारे ।\nहोत न आज्ञा बिनु पैसारे ॥', en: 'Rāma duāre tuma rakhavāre,\nHota na āgyā binu paisāre.' },
        { dev: 'सब सुख लहैं तुम्हारी सरना ।\nतुम रक्षक काहू को डरना ॥', en: 'Saba sukha lahaiṁ tumhārī saranā,\nTuma rakshaka kāhū ko ḍaranā.' },
        { dev: 'आपन तेज सम्हारो आपै ।\nतीनों लोक हाँक तें काँपै ॥', en: 'Āpana teja samhāro āpai,\nTīnoṁ loka hāṁka teṁ kāṁpai.' },
        { dev: 'भूत पिसाच निकट नहिं आवै ।\nमहाबीर जब नाम सुनावै ॥', en: 'Bhūta pisācha nikaṭa nahiṁ āvai,\nMahābīra jaba nāma sunāvai.' },
        { dev: 'नासै रोग हरै सब पीरा ।\nजपत निरंतर हनुमत बीरा ॥', en: 'Nāsai roga harai saba pīrā,\nJapata nirantara Hanumata bīrā.' },
        { dev: 'संकट तें हनुमान छुड़ावै ।\nमन क्रम बचन ध्यान जो लावै ॥', en: 'Saṅkaṭa teṁ Hanumāna chuḍāvai,\nMana krama bachana dhyāna jo lāvai.' },
        { dev: 'सब पर राम तपस्वी राजा ।\nतिन के काज सकल तुम साजा ॥', en: 'Saba para Rāma tapasvī rājā,\nTina ke kāja sakala tuma sājā.' },
        { dev: 'और मनोरथ जो कोई लावै ।\nसोई अमित जीवन फल पावै ॥', en: 'Aura manoratha jo koī lāvai,\nSoī amita jīvana phala pāvai.' },
        { dev: 'चारों जुग परताप तुम्हारा ।\nहै परसिद्ध जगत उजियारा ॥', en: 'Chāroṁ juga paratāpa tumhārā,\nHai parasiddha jagata ujiyārā.' },
        { dev: 'साधु संत के तुम रखवारे ।\nअसुर निकंदन राम दुलारे ॥', en: 'Sādhu santa ke tuma rakhavāre,\nAsura nikandana Rāma dulāre.' },
        { dev: 'अष्ट सिद्धि नौ निधि के दाता ।\nअस बर दीन जानकी माता ॥', en: 'Ashṭa siddhi nau nidhi ke dātā,\nAsa bara dīna Jānakī mātā.' },
        { dev: 'राम रसायन तुम्हरे पासा ।\nसदा रहो रघुपति के दासा ॥', en: 'Rāma rasāyana tumhare pāsā,\nSadā raho Raghupati ke dāsā.' },
        { dev: 'तुम्हरे भजन राम को पावै ।\nजनम जनम के दुख बिसरावै ॥', en: 'Tumhare bhajana Rāma ko pāvai,\nJanama janama ke dukha bisarāvai.' },
        { dev: 'अंत काल रघुबर पुर जाई ।\nजहाँ जन्म हरिभक्त कहाई ॥', en: 'Anta kāla Raghubara pura jāī,\nJahāṁ janma Haribhakta kahāī.' },
        { dev: 'और देवता चित्त न धरई ।\nहनुमत सेइ सर्ब सुख करई ॥', en: 'Aura devatā chitta na dharaī,\nHanumata sei sarba sukha karaī.' },
        { dev: 'संकट कटै मिटै सब पीरा ।\nजो सुमिरै हनुमत बलबीरा ॥', en: 'Saṅkaṭa kaṭai miṭai saba pīrā,\nJo sumirai Hanumata balabīrā.' },
        { dev: 'जय जय जय हनुमान गोसाईं ।\nकृपा करहु गुरुदेव की नाईं ॥', en: 'Jaya jaya jaya Hanumāna Gosāīṁ,\nKṛpā karahu Gurudeva kī nāīṁ.' },
        { dev: 'जो सत बार पाठ कर कोई ।\nछूटहि बंदि महा सुख होई ॥', en: 'Jo sata bāra pāṭha kara koī,\nChūṭahi bandi mahā sukha hoī.' },
        { dev: 'जो यह पढ़ै हनुमान चालीसा ।\nहोय सिद्धि साखी गौरीसा ॥', en: 'Jo yaha paḍhai Hanumāna Chālīsā,\nHoya siddhi sākhī Gaurīsā.' },
        { label: 'Doha', dev: 'तुलसीदास सदा हरि चेरा ।\nकीजै नाथ हृदय महँ डेरा ॥', en: 'Tulasīdāsa sadā Hari cherā,\nKījai nātha hṛdaya mahaṁ ḍerā.' },
        { label: 'Doha', dev: 'पवनतनय संकट हरन, मंगल मूरति रूप ।\nराम लखन सीता सहित, हृदय बसहु सुर भूप ॥', en: 'Pavanatanaya saṅkaṭa harana, maṅgala mūrati rūpa,\nRāma Lakhana Sītā sahita, hṛdaya basahu sura bhūpa.' }
      ]
    },

    /* ==================================================================
       LORD SHIVA
       ================================================================== */
    {
      id: 'shiv-tandav',
      name: 'Shiva Tandava Stotram',
      nameDev: 'शिव ताण्डव स्तोत्रम्',
      deity: 'shiva',
      deityName: 'Lord Shiva',
      deityDev: 'शिव',
      type: 'stotra',
      verses: [
        { label: 'Verse 1', dev: 'जटा टवी गलज्जलप्रवाह पावितस्थले\nगलेऽव लम्ब्यलम्बितां भुजंगतुंग मालिकाम्‌।\nडमड्डमड्डमड्डमन्निनाद वड्डमर्वयं\nचकारचण्डताण्डवं तनोतु नः शिव: शिवम्‌ ॥१॥', en: 'Jaṭā ṭavī galajjala-pravāha pāvita-sthale\nGale\'va lambya-lambitāṁ bhujaṅga-tuṅga mālikām,\nḌamaḍ-ḍamaḍ-ḍamaḍ-ḍaman-nināda vaḍḍamarvayaṁ\nChakāra-chaṇḍa-tāṇḍavaṁ tanotu naḥ Śivaḥ śivam. ॥1॥' },
        { label: 'Verse 2', dev: 'जटाकटा हसंभ्रम भ्रमन्निलिंपनिर्झरी\nविलोलवीचिवल्लरी विराजमानमूर्धनि।\nधगद्धगद्धगज्ज्वल ल्ललाटपट्टपावके\nकिशोरचंद्रशेखरे रतिः प्रतिक्षणं मम: ॥२॥', en: 'Jaṭā-kaṭāha-saṁbhrama bhramannilimpa-nirjharī\nVilola-vīchi-vallarī virāja-māna-mūrdhani,\nDhagad-dhagad-dhagaj-jvala llalāṭa-paṭṭa-pāvake\nKiśora-chandra-śekhare ratiḥ pratikṣaṇaṁ mama. ॥2॥' },
        { label: 'Verse 3', dev: 'धराधरेंद्रनंदिनी विलासबन्धुबन्धुर\nस्फुरद्दिगंतसंतति प्रमोद मानमानसे।\nकृपाकटाक्षधोरणी निरुद्धदुर्धरापदि\nक्वचिद्विगम्बरे मनोविनोदमेतु वस्तुनि ॥३॥', en: 'Dharādharendranandhinī vilāsa-bandhu-bandhura\nSphuraḍ-diganta-santati pramoda māna-mānase,\nKṛpā-kaṭākṣa-dhoraṇī niruddha-durdhara-āpadi\nKvachid-vigambare mano-vinodam-etu vastuni. ॥3॥' },
        { label: 'Verse 4', dev: 'जटाभुजंगपिंगल स्फुरत्फणामणिप्रभा\nकदंबकुंकुमद्रव प्रलिप्तदिग्व धूमुखे।\nमदांधसिंधु रस्फुरत्वगुत्तरीयमेदुरे\nमनोविनोदद्भुतं बिंभर्तुभूत भर्तरि ॥४॥', en: 'Jaṭā-bhujaṅga-piṅgala sphurat-phaṇā-maṇi-prabhā\nKadamba-kuṅkuma-drava pralipta-digvadhu-mukhe,\nMadāndha-sindhu rasphurat-vaguttarīya-medure\nMano-vinodad-bhutaṁ biṁbhartu-bhūta-bhartari. ॥4॥' },
        { label: 'Verse 5', dev: 'सहस्रलोचन प्रभृत्यशेषलेखशेखर\nप्रसूनधूलिधोरणी विधूसरां घ्रिपीठभूः।\nभुजंगराजमालया निबद्धजाटजूटकः\nश्रियैचिरायजायतां चकोरबंधुशेखरः ॥५॥', en: 'Sahasra-lochana prabhṛty-aśeṣa-lekha-śekhara\nPrasūna-dhūli-dhoraṇī vidhūsarāṁ ghripīṭha-bhūḥ,\nBhujaṅga-rāja-mālayā nibaddha-jāṭa-jūṭakaḥ\nŚriyai-chirāya-jāyatāṁ chakora-bandhu-śekharaḥ. ॥5॥' },
        { label: 'Verse 6', dev: 'ललाटचत्वरज्वल द्धनंजयस्फुलिंगभा\nनिपीतपंच सायकंनम न्निलिंपनायकम्‌।\nसुधामयूखलेखया विराजमानशेखरं\nमहाकपालिसंपदे शिरोजटालमस्तुनः ॥६॥', en: 'Lalāṭa-chatvara-jvala ddhanañjaya-sphuliṅga-bhā\nNipīta-pañcha sāyakaṁ-nama nnilimpa-nāyakam,\nSudhā-mayūkha-lekhayā virāja-māna-śekharaṁ\nMahā-kapāli-sampade śiro-jaṭāla-mastu-naḥ. ॥6॥' },
        { label: 'Verse 7', dev: 'करालभालपट्टिका धगद्धगद्धगज्ज्वल\nद्धनंजया धरीकृतप्रचंड पंचसायके।\nधराधरेंद्रनंदिनी कुचाग्रचित्रपत्र\nकप्रकल्पनैकशिल्पिनी त्रिलोचनेरतिर्मम ॥७॥', en: 'Karāla-bhāla-paṭṭikā dhagad-dhagad-dhagaj-jvala\nDdhanañjayā dharī-kṛta-prachaṇḍa pañcha-sāyake,\nDharādharendranandhinī kuchāgra-chitra-patra\nKa-prakalpanaika-śilpinī trilochane-ratir-mama. ॥7॥' },
        { label: 'Verse 8', dev: 'नवीनमेघमंडली निरुद्धदुर्धरस्फुर\nत्कुहुनिशीथनीतमः प्रबद्धबद्धकन्धरः।\nनिलिम्पनिर्झरीधरस्तनोतु कृत्तिसिंधुरः\nकलानिधानबंधुरः श्रियं जगंद्धुरंधरः ॥८॥', en: 'Navīna-megha-maṇḍalī niruddha-durdhara-sphura\nTkuhu-niśītha-nītamaḥ prabaddha-baddha-kandharaḥ,\nNilimpa-nirjharī-dharas-tanotu kṛtti-sindhuraḥ\nKalā-nidhāna-bandhuraḥ śriyaṁ jagad-dhuraṁdharaḥ. ॥8॥' },
        { label: 'Verse 9', dev: 'प्रफुल्लनीलपंकज प्रपंचकालिमप्रभा\nविडंबि कंठकंध रारुचि प्रबंधकंधरम्‌।\nस्मरच्छिदं पुरच्छिंद भवच्छिदं मखच्छिदं\nगजच्छिदांधकच्छिदं तमंतकच्छिदं भजे ॥९॥', en: 'Praphulla-nīla-paṅkaja prapañcha-kālima-prabhā\nViḍambi kaṇṭha-kandha rāruchi prabandha-kandharam,\nSmara-cchidaṁ pura-cchinda bhava-cchidaṁ makha-cchidaṁ\nGaja-cchidāṁdhaka-cchidaṁ tam-antaka-cchidaṁ bhaje. ॥9॥' },
        { label: 'Verse 10', dev: 'अखर्वसर्वमंगला कलाकदम्बमंजरी\nरसप्रवाह माधुरी विजृंभणा मधुव्रतम्‌।\nस्मरांतकं पुरातकं भावंतकं मखांतकं\nगजांतकांधकांतकं तमंतकांतकं भजे ॥१०॥', en: 'Akharva-sarva-maṅgalā kalā-kadamba-mañjarī\nRasa-pravāha mādhurī vijṛmbhaṇā madhu-vratam,\nSmarāntakaṁ purātakaṁ bhāvantakaṁ makhāntakaṁ\nGajāntakāṁdhakāntakaṁ tam-antakāntakaṁ bhaje. ॥10॥' },
        { label: 'Verse 11', dev: 'जयत्वदभ्रविभ्रम भ्रमद्भुजंगमस्फुर\nद्धगद्धगद्विनिर्गमत्कराल भाल हव्यवाट्।\nधिमिद्धिमिद्धि मिध्वनन्मृदंग तुंगमंगल\nध्वनिक्रमप्रवर्तित: प्रचण्ड ताण्डवः शिवः ॥११॥', en: 'Jayatvad-abhra-vibhrama bhramad-bhujaṅga-masphura\nDdhagad-dhagad-vinirgamat-karāla bhāla havya-vāṭ,\nDhimid-dhimid-dhi midhvanan-mṛdaṅga tuṅga-maṅgala\nDhvani-krama-pravartitaḥ prachaṇḍa tāṇḍavaḥ Śivaḥ. ॥11॥' },
        { label: 'Verse 12', dev: 'दृषद्विचित्रतल्पयो र्भुजंगमौक्तिकमस्र\nजोर्गरिष्ठरत्नलोष्ठयोः सुहृद्विपक्षपक्षयोः।\nतृणारविंदचक्षुषोः प्रजामहीमहेन्द्रयोः\nसमं प्रवर्तयन्मनः कदा सदाशिवं भजे ॥१२॥', en: 'Dṛṣad-vichitra-talpayo rbhujaṅga-mauktika-masra\nJor-gariṣṭha-ratna-loṣṭhayoḥ suhṛd-vipakṣa-pakṣayoḥ,\nTṛṇā-ravinda-chakṣuṣoḥ prajā-mahī-mahendrayoḥ\nSamaṁ pravartayan-manaḥ kadā Sadāśivaṁ bhaje. ॥12॥' },
        { label: 'Verse 13', dev: 'कदा निलिंपनिर्झरी निकुंजकोटरे वसन्‌\nविमुक्तदुर्मतिः सदा शिरःस्थमंजलिं वहन्‌।\nविमुक्तलोललोचनो ललामभाललग्नकः\nशिवेति मंत्रमुच्चरन्‌ कदा सुखी भवाम्यहम्‌ ॥१३॥', en: 'Kadā nilimpa-nirjharī nikuñja-koṭare vasan\nVimukta-durmatiḥ sadā śiraḥ-stham-añjaliṁ vahan,\nVimukta-lola-lochano lalāma-bhāla-lagnakaḥ\nŚiveti mantra-muchcharan kadā sukhī bhavāmy-aham. ॥13॥' },
        { label: 'Closing Verse', dev: 'इमं हि नित्यमेव मुक्तमुक्तमोत्तम स्तवं\nपठन्स्मरन्‌ ब्रुवन्नरो विशुद्धमेति संततम्‌।\nहरे गुरौ सुभक्तिमाशु याति नान्यथागतिं\nविमोहनं हि देहिनां सुशंकरस्य चिंतनम्‌ ॥१६॥', en: 'Imaṁ hi nityam-eva mukta-muktam-ottama stavaṁ\nPaṭhan-smaran bruvannaro viśuddham-eti santatam,\nHare gurau subhaktim-āśu yāti nānyathā-gatiṁ\nVimohanaṁ hi dehināṁ Suśaṅkarasya chintanam. ॥16॥' }
      ]
    },
    {
      id: 'shiv-chalisa',
      name: 'Shiv Chalisa',
      nameDev: 'शिव चालीसा',
      deity: 'shiva',
      deityName: 'Lord Shiva',
      deityDev: 'शिव',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'जय गिरिजा पति दीनदयाला ।\nसदा करत सन्तन प्रतिपाला ॥', en: 'Jaya Girijāpati dīnadayālā,\nSadā karata santana pratipālā.' },
        { dev: 'भाल चन्द्रमा सोहत नीके ।\nकानन कुंडल नागफनी के ॥', en: 'Bhāla chandramā sohata nīke,\nKānana kuṇḍala nāgaphanī ke.' },
        { dev: 'अंग गौर शिर गंग बहाए ।\nमुण्डमाल तन छार लगाए ॥', en: 'Aṅga gaura shira Gaṅga bahāe,\nMuṇḍamāla tana chhāra lagāe.' },
        { dev: 'वस्त्र खाल बाघम्बर सोहै ।\nछवि को देख नाग मुनि मोहै ॥', en: 'Vastra khāla bāghambara sohai,\nChhavi ko dekha Nāga muni mohai.' },
        { dev: 'मैना मातु की हवै दुलारी ।\nबाम अंग सोहत छवि न्यारी ॥', en: 'Mainā mātu kī havai dulārī,\nBāma aṅga sohata chhavi nyārī.' },
        { dev: 'कर त्रिशूल सोहत छवि भारी ।\nकरत सदा भक्तन हितकारी ॥', en: 'Kara trishūla sohata chhavi bhārī,\nKarata sadā bhaktana hitakārī.' },
        { dev: 'नंदी गणेश सोहैं तहँ कैसे ।\nसागर मध्य कमल हैं जैसे ॥', en: 'Nandī Gaṇesha sohaiṁ tahaṁ kaise,\nSāgara madhya kamala haiṁ jaise.' },
        { dev: 'कार्तिक श्याम और गणराऊ ।\nया छवि को कहि जात न काऊ ॥', en: 'Kārtika śyāma aura Gaṇarāū,\nYā chhavi ko kahi jāta na kāū.' },
        { dev: 'देवन जबहीं जाय पुकारा ।\nतब ही दुख प्रभु आप निवारा ॥', en: 'Devana jabahīṁ jāya pukārā,\nTaba hī dukha Prabhu āpa nivārā.' },
        { dev: 'किया उपद्रव तारक भारी ।\nदेवन सब मिलि तुमहीं जुहारी ॥', en: 'Kiyā upadrava Tāraka bhārī,\nDevana saba mili tumahīṁ juhārī.' },
        { dev: 'तुरत षडानन आप पठायउ ।\nलवनिमेष महँ मारि गिरायउ ॥', en: 'Turata Shaḍānana āpa paṭhāyau,\nLavanimēsha mahaṁ māri girāyau.' },
        { dev: 'आप जलंधर असुर सँहारा ।\nसुयश तुम्हार विदित संसारा ॥', en: 'Āpa Jalandhara asura saṁhārā,\nSuyasha tumhāra vidita saṁsārā.' },
        { dev: 'त्रिपुरासुर सन युद्ध मचाई ।\nसबहिं कृपा कर लीन बचाई ॥', en: 'Tripurāsura sana yuddha machāī,\nSabahiṁ kṛpā kara līna bachāī.' },
        { dev: 'किया तपहिं भागीरथ भारी ।\nपुरब प्रतिज्ञा तासु पुरारी ॥', en: 'Kiyā tapahiṁ Bhāgīratha bhārī,\nPuraba pratignyā tāsu Purārī.' },
        { dev: 'दानिन महँ तुम सम कोउ नाहीं ।\nसेवक स्तुति करत सदाहीं ॥', en: 'Dānina mahaṁ tuma sama kou nāhīṁ,\nSevaka stuti karata sadāhīṁ.' },
        { dev: 'वेद नाम महिमा तव गाई ।\nअकथ अनादि भेद नहिं पाई ॥', en: 'Veda nāma mahimā tava gāī,\nAkatha anādi bheda nahiṁ pāī.' },
        { dev: 'प्रगट उदधि मंथन में ज्वाला ।\nजरत सुरासुर भए विहाला ॥', en: 'Pragaṭa udadhi manthana meṁ jvālā,\nJarata surāsura bhae vihālā.' },
        { dev: 'कीन्ह दया तहँ करी सहाई ।\nनीलकंठ तब नाम कहाई ॥', en: 'Kīnha dayā tahaṁ karī sahāī,\nNīlakaṇṭha taba nāma kahāī.' },
        { dev: 'पूजन रामचन्द्र जब कीन्हा ।\nजीत के लंक विभीषण दीन्हा ॥', en: 'Pūjana Rāmachandra jaba kīnhā,\nJīta ke Laṅka Vibhīṣaṇa dīnhā.' },
        { dev: 'सहस कमल में हो रहे धारी ।\nकीन्ह परीक्षा तबहीं पुरारी ॥', en: 'Sahasa kamala meṁ ho rahe dhārī,\nKīnha parīkshā tabahīṁ Purārī.' },
        { dev: 'एक कमल प्रभु राखेउ जोई ।\nकमल नयन पूजन चहं सोई ॥', en: 'Eka kamala Prabhu rākheu joī,\nKamala nayana pūjana chahaṁ soī.' },
        { dev: 'कठिन भक्ति देखी प्रभु शंकर ।\nभए प्रसन्न दिए इच्छित वर ॥', en: 'Kaṭhina bhakti dekhī Prabhu Shaṅkara,\nBhae prasanna die ichchhita vara.' },
        { label: 'Doha', dev: 'जय जय जय अनन्त अविनाशी ।\nकरत कृपा सबके घटवासी ॥\nदुष्ट सकल निर्मूल करो महि ।\nआश्रित हेतु करो सुख लहि ॥', en: 'Jaya jaya jaya ananta avināshī,\nKarata kṛpā sabake ghaṭavāsī.\nDushṭa sakala nirmūla karo mahi,\nĀśrita hetu karo sukha lahi.' }
      ]
    },
    {
      id: 'rudrashtakam',
      name: 'Rudrashtakam',
      nameDev: 'रुद्राष्टकम्',
      deity: 'shiva',
      deityName: 'Lord Shiva',
      deityDev: 'शिव',
      type: 'stotra',
      verses: [
        { dev: 'नमामीशमीशान निर्वाणरूपं\nविभुं व्यापकं ब्रह्मवेदस्वरूपम् ।\nनिजं निर्गुणं निर्विकल्पं निरीहं\nचिदाकाशमाकाशवासं भजेऽहम् ॥', en: 'Namāmīśamīśāna nirvāṇarūpaṁ\nVibhuṁ vyāpakaṁ brahmavedasvarūpam,\nNijaṁ nirguṇaṁ nirvikalpaṁ nirīhaṁ\nChidākāśamākāśavāsaṁ bhaje\'ham.' },
        { dev: 'निराकारमोंकारमूलं तुरीयं\nगिरा ज्ञान गोतीतमीशं गिरीशम् ।\nकरालं महाकाल कालं कृपालं\nगुणागार संसारपारं नतोऽहम् ॥', en: 'Nirākāramoṁkāramūlaṁ turīyaṁ\nGirā gyāna gotītamīśaṁ girīśam,\nKarālaṁ mahākāla kālaṁ kṛpālaṁ\nGuṇāgāra saṁsārapāraṁ nato\'ham.' },
        { dev: 'तुषाराद्रि संकाश गौरं गभीरं\nमनोभूत कोटिप्रभा श्री शरीरम् ।\nस्फुरन्मौलि कल्लोलिनी चारु गंगा\nलसद्भालबालेन्दु कण्ठे भुजंगा ॥', en: 'Tuṣārādri saṅkāśa gauraṁ gabhīraṁ\nManobhūta koṭiprabhā śrī śarīram,\nSphuranmauli kallōlinī chāru Gaṅgā\nLasadbhālabālendu kaṇṭhe bhujaṅgā.' },
        { dev: 'चलत्कुण्डलं भ्रू सुनेत्रं विशालं\nप्रसन्नाननं नीलकण्ठं दयालम् ।\nमृगाधीशचर्माम्बरं मुण्डमालं\nप्रियं शंकरं सर्वनाथं भजामि ॥', en: 'Chalatkuṇḍalaṁ bhrū sunetraṁ viśālaṁ\nPrasannānanaṁ nīlakaṇṭhaṁ dayālam,\nMṛgādhīśacharmāmbaraṁ muṇḍamālaṁ\nPriyaṁ Śaṅkaraṁ sarvanāthaṁ bhajāmi.' },
        { dev: 'प्रचण्डं प्रकृष्टं प्रगल्भं परेशं\nअखण्डं अजं भानुकोटिप्रकाशम् ।\nत्रयः शूलनिर्मूलनं शूलपाणिं\nभजेऽहं भवानीपतिं भावगम्यम् ॥', en: 'Prachaṇḍaṁ prakṛṣṭaṁ pragalbhaṁ pareśaṁ\nAkhaṇḍaṁ ajaṁ bhānukoṭiprakāśam,\nTrayaḥ śūlanirmūlanaṁ śūlapāṇiṁ\nBhaje\'haṁ Bhavānīpatiṁ bhāvagamyam.' },
        { dev: 'कलातीत कल्याण कल्पान्तकारी\nसदा सज्जनानन्ददाता पुरारी ।\nचिदानन्दसंदोह मोहापहारी\nप्रसीद प्रसीद प्रभो मन्मथारी ॥', en: 'Kalātīta kalyāṇa kalpāntakārī\nSadā sajjanānandadātā Purārī,\nChidānandasandoha mohāpahārī\nPrasīda prasīda Prabho manmathārī.' },
        { dev: 'न यावद् उमानाथ पादारविन्दं\nभजन्तीह लोके परे वा नराणाम् ।\nन तावत्सुखं शान्ति सन्तापनाशं\nप्रसीद प्रभो सर्वभूताधिवासम् ॥', en: 'Na yāvad Umānātha pādāravindaṁ\nBhajantīha loke pare vā narāṇām,\nNa tāvatsukhaṁ śānti santāpanāśaṁ\nPrasīda Prabho sarvabhūtādhivāsam.' },
        { dev: 'न जानामि योगं जपं नैव पूजां\nनतोऽहं सदा सर्वदा शम्भु तुभ्यम् ।\nजरा जन्म दुःखौघ तातप्यमानं\nप्रभो पाहि आपन्नमामीश शम्भो ॥', en: 'Na jānāmi yogaṁ japaṁ naiva pūjāṁ\nNato\'haṁ sadā sarvadā Śambhu tubhyam,\nJarā janma duḥkhaugha tātapyamānaṁ\nPrabho pāhi āpannamāmīśa Śambho.' }
      ]
    },

    /* ==================================================================
       LORD VISHNU
       ================================================================== */
    {
      id: 'vishnu-chalisa',
      name: 'Vishnu Chalisa',
      nameDev: 'विष्णु चालीसा',
      deity: 'vishnu',
      deityName: 'Lord Vishnu',
      deityDev: 'विष्णु',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'श्री हरि विष्णु कृपालु दयालु ।\nदुष्ट दलन भय भंजन कालु ॥', en: 'Śrī Hari Viṣṇu kṛpālu dayālu,\nDuṣṭa dalana bhaya bhaṁjana kālu.' },
        { label: 'Doha', dev: 'जय जय विष्णु लक्ष्मी रमणा ।\nशरणागत सुख भव भय हरणा ॥', en: 'Jaya jaya Viṣṇu Lakṣmī Ramaṇā,\nŚaraṇāgata sukha bhava bhaya haraṇā.' },
        { label: 'Chaupai', dev: 'सिंधु सुता प्रिय संग सोहावै ।\nचारों धाम तुम्हें सुख पावै ॥', en: 'Sindhu sutā priya saṅga sohāvai,\nChāroṁ dhāma tumheṁ sukha pāvai.' },
        { dev: 'शेषनाग पर शयन तुम्हारा ।\nकरत सदा भक्तन प्रतिपारा ॥', en: 'Śeṣanāga para śayana tumhārā,\nKarata sadā bhaktana pratipārā.' },
        { dev: 'ब्रह्मा रुद्र सनातन देवा ।\nतव गुण गावत करत सदा सेवा ॥', en: 'Brahmā Rudra sanātana devā,\nTava guṇa gāvata karata sadā sevā.' },
        { dev: 'कृपा दृष्टि नर पर जब कीजै ।\nदुष्टन दूर करो बल दीजै ॥', en: 'Kṛpā dṛṣṭi nara para jaba kījai,\nDuṣṭana dūra karo bala dījai.' },
        { dev: 'दशरथ सुत श्री राम कहाये ।\nराक्षस निकंदन आप बनाये ॥', en: 'Daśaratha suta Śrī Rāma kahāye,\nRākṣasa nikandana āpa banāye.' },
        { dev: 'अहिल्या उद्धार किया जग जाना ।\nगौतम ऋषि पत्नी पहचाना ॥', en: 'Ahilyā uddhāra kiyā jaga jānā,\nGautama ṛṣi patnī pahachānā.' },
        { dev: 'सीता सहित लखन जी ले आये ।\nधनुष तोड़ सीता वर पाये ॥', en: 'Sītā sahita Lakhana jī le āye,\nDhanuṣa toḍa Sītā vara pāye.' },
        { dev: 'वनवास चौदह बरस बिताये ।\nदुष्ट रावण मारि गिराये ॥', en: 'Vanavāsa chaudaha barasa bitāye,\nDuṣṭa Rāvaṇa māri girāye.' },
        { dev: 'मत्स्य रूप धरि तुमने आये ।\nवेद चोर मधु कैटभ माये ॥', en: 'Matsya rūpa dhari tumane āye,\nVeda chora Madhu Kaiṭabha māye.' },
        { dev: 'कूर्म रूप धरि सागर मथवायो ।\nलक्ष्मी संग रतन सब पायो ॥', en: 'Kūrma rūpa dhari sāgara mathavāyo,\nLakṣmī saṅga ratana saba pāyo.' },
        { dev: 'वराह रूप तुमने जो धारा ।\nहिरण्याक्ष को मारि संहारा ॥', en: 'Varāha rūpa tumane jo dhārā,\nHiraṇyākṣa ko māri saṁhārā.' },
        { dev: 'नरसिंह रूप अद्भुत धारी ।\nहिरण्यकशिपु को मारि संहारी ॥', en: 'Narasiṁha rūpa adbhuta dhārī,\nHiraṇyakaśipu ko māri saṁhārī.' },
        { dev: 'प्रह्लाद बचायो हरि हरि गाये ।\nसन्त प्रेम देख प्रभु आये ॥', en: 'Prahlāda bachāyo Hari Hari gāye,\nSanta prema dekha Prabhu āye.' },
        { dev: 'वामन रूप धरि तुम जग आये ।\nबलि राजा को पाताल पठाये ॥', en: 'Vāmana rūpa dhari tuma jaga āye,\nBali rājā ko pātāla paṭhāye.' },
        { dev: 'तीन लोक तुम तीन पद नापा ।\nबलि बाँधे गर्व सब कापा ॥', en: 'Tīna loka tuma tīna pada nāpā,\nBali bāṁdhe garva saba kāpā.' },
        { dev: 'परशुराम तुम छठे अवतारा ।\nक्षत्रिय वंश किया संहारा ॥', en: 'Paraśurāma tuma chhaṭhe avatārā,\nKṣatriya vaṁśa kiyā saṁhārā.' },
        { dev: 'सहस्रबाहु को मारि गिरायो ।\nब्रह्मण द्रोह सबन को मिटायो ॥', en: 'Sahasrabāhu ko māri girāyo,\nBrahmaṇa droha sabana ko miṭāyo.' },
        { dev: 'श्री कृष्ण रूप धरि कंस संहारा ।\nगीता ज्ञान अर्जुन को तारा ॥', en: 'Śrī Kṛṣṇa rūpa dhari Kaṁsa saṁhārā,\nGītā gyāna Arjuna ko tārā.' },
        { dev: 'द्रौपदी चीर बढ़ायो अपारा ।\nद्वारिकाधीश बने मुरलीधारा ॥', en: 'Draupadī chīra baḍhāyo apārā,\nDvārikādhīśa bane Muralīdhārā.' },
        { dev: 'बुद्ध रूप तुम प्रगट भए भारी ।\nजीव हिंसा सब दूर निवारी ॥', en: 'Buddha rūpa tuma pragaṭa bhae bhārī,\nJīva hiṁsā saba dūra nivārī.' },
        { dev: 'कलि में कल्कि अवतार तुम्हारा ।\nपापियों का करो संहारा ॥', en: 'Kali meṁ Kalki avatāra tumhārā,\nPāpiyoṁ kā karo saṁhārā.' },
        { dev: 'दश अवतार तुम्हारे जग माहीं ।\nतुम सम प्रभु कोऊ दयालु नाहीं ॥', en: 'Daśa avatāra tumhāre jaga māhīṁ,\nTuma sama Prabhu koū dayālu nāhīṁ.' },
        { dev: 'गरुड़ पर चढ़ि भक्तन हित धावो ।\nसुदर्शन चक्र से दुष्ट नशावो ॥', en: 'Garuḍa para chaḍhi bhaktana hita dhāvo,\nSudarśana chakra se duṣṭa naśāvo.' },
        { dev: 'शंख चक्र गदा पद्म विराजै ।\nवनमाला गले सोभित साजै ॥', en: 'Śaṅkha chakra gadā padma virājai,\nVanamālā gale śobhita sājai.' },
        { dev: 'कौस्तुभ मणि उर पर सोहावै ।\nपीताम्बर छवि मन को भावै ॥', en: 'Kaustubha maṇi ura para sohāvai,\nPītāmbara chhavi mana ko bhāvai.' },
        { dev: 'क्षीरसागर तुम वास तुम्हारा ।\nलक्ष्मी चरण दबावें प्यारा ॥', en: 'Kṣīrasāgara tuma vāsa tumhārā,\nLakṣmī charaṇa dabāveṁ pyārā.' },
        { dev: 'ब्रह्मा नाभि कमल से आये ।\nतुम ब्रह्मांड रचन को ठहराये ॥', en: 'Brahmā nābhi kamala se āye,\nTuma brahmāṇḍa rachana ko ṭhaharāye.' },
        { dev: 'ध्रुव प्रह्लाद नरद जग गाये ।\nतिनके कष्ट सकल तुम हराये ॥', en: 'Dhruva Prahlāda Narada jaga gāye,\nTinake kaṣṭa sakala tuma harāye.' },
        { dev: 'शरणागत को सदा सम्हारो ।\nभक्तन के सब कष्ट निवारो ॥', en: 'Śaraṇāgata ko sadā saṁhāro,\nBhaktana ke saba kaṣṭa nivāro.' },
        { dev: 'जो कोई पूजे विष्णु भगवाना ।\nताको मिले सुख गहन निधाना ॥', en: 'Jo koī pūje Viṣṇu Bhagavānā,\nTāko mile sukha gahana nidhānā.' },
        { dev: 'सन्तन की सदा रक्षा कीजै ।\nभक्तन को अभयदान सदा दीजै ॥', en: 'Santana kī sadā rakṣā kījai,\nBhaktana ko abhayadāna sadā dījai.' },
        { dev: 'पाप ताप सब हरन तुम्हारे ।\nसेवक को कभी न बिसारे ॥', en: 'Pāpa tāpa saba harana tumhāre,\nSevaka ko kabhī na bisāre.' },
        { dev: 'विष्णु चालीसा जो कोई गावै ।\nघर बैठे नरहरि को पावै ॥', en: 'Viṣṇu Chālīsā jo koī gāvai,\nGhara baiṭhe Narahari ko pāvai.' },
        { dev: 'सुख सम्पत्ति घर आवै सारी ।\nक्लेश कष्ट मिटै भवभय भारी ॥', en: 'Sukha sampatti ghara āvai sārī,\nKleśa kaṣṭa miṭai bhavabhaya bhārī.' },
        { label: 'Doha', dev: 'विष्णु चालीसा पढ़ै, भाव सहित जो कोय ।\nविष्णुलोक को जाय सो, अमर अवध सुख होय ॥', en: 'Viṣṇu Chālīsā paḍhai, bhāva sahita jo koya,\nViṣṇuloka ko jāya so, amara avadha sukha hoya.' }
      ]
    },
    {
      id: 'vishnu-stuti',
      name: 'Vishnu Stuti',
      nameDev: 'विष्णु स्तुति',
      deity: 'vishnu',
      deityName: 'Lord Vishnu',
      deityDev: 'विष्णु',
      type: 'stuti',
      verses: [
        { dev: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम् ।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥', en: 'Śāntākāraṁ bhujagaśayanaṁ padmanābhaṁ sureśaṁ\nViśvādhāraṁ gaganasadṛśaṁ meghavarṇaṁ śubhāṅgam,\nLakṣmīkāntaṁ kamalanayanaṁ yogibhirdhyānagamyaṁ\nVande Viṣṇuṁ bhavabhayaharaṁ sarvalokaikanātham.' },
        { dev: 'सशंखचक्रं सकिरीटकुण्डलं\nसपीतवस्त्रं सरसीरुहेक्षणम् ।\nसहारवक्षस्थलशोभिकौस्तुभं\nनमामि विष्णुं शिरसा चतुर्भुजम् ॥', en: 'Saśaṅkhachakraṁ sakirīṭakuṇḍalaṁ\nSapītavastraṁ sarasīruhekṣaṇam,\nSahāravakṣasthalaśobhikaustubhaṁ\nNamāmi Viṣṇuṁ śirasā chaturbhujam.' },
        { dev: 'मेघश्यामं पीतकौशेयवासं\nश्रीवत्साङ्कं कौस्तुभोद्भासिताङ्गम् ।\nपुण्योपेतं पुण्डरीकायताक्षं\nविष्णुं वन्दे सर्वलोकैकनाथम् ॥', en: 'Meghaśyāmaṁ pītakauśeyavāsaṁ\nŚrīvatsāṅkaṁ kaustubhodbhāsitāṅgam,\nPuṇyopetaṁ puṇḍarīkāyatākṣaṁ\nViṣṇuṁ vande sarvalokaikanātham.' },
        { dev: 'नमः समस्तभूतानामादिभूताय भूभृते ।\nअनेकरूपरूपाय विष्णवे प्रभविष्णवे ॥', en: 'Namaḥ samastabhūtānāmādibhūtāya bhūbhṛte,\nAnekarūparūpāya Viṣṇave prabhaviṣṇave.' }
      ]
    },

    /* ==================================================================
       LORD KRISHNA
       ================================================================== */
    {
      id: 'krishna-chalisa',
      name: 'Krishna Chalisa',
      nameDev: 'कृष्ण चालीसा',
      deity: 'krishna',
      deityName: 'Lord Krishna',
      deityDev: 'कृष्ण',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'बांके बिहारी कृपालु, श्याम कृष्ण भगवान ।\nजय द्वारिकाधीश प्रभु, सबके करो कल्याण ॥', en: 'Bāṅke Bihārī kṛpālu, Śyāma Kṛṣṇa Bhagavāna,\nJaya Dvārikādhīśa Prabhu, sabake karo kalyāṇa.' },
        { label: 'Doha', dev: 'जय यशोदा के लाल प्रभु, नंद के आनंद ।\nब्रज में रास रचाइया, मुरली मनोहर चंद ॥', en: 'Jaya Yaśodā ke lāla Prabhu, Nanda ke ānanda,\nBraja meṁ rāsa rachāiyā, muralī manohara chanda.' },
        { label: 'Chaupai', dev: 'गोपियों संग खेल रचायो ।\nरासलीला में मन ललचायो ॥', en: 'Gopiyoṁ saṅga khela rachāyo,\nRāsalīlā meṁ mana lalachāyo.' },
        { dev: 'माखन चोरी तुमने कीन्हा ।\nउद्धव को ज्ञान संदेश दीन्हा ॥', en: 'Mākhana chorī tumane kīnhā,\nUddhava ko gyāna sandeśa dīnhā.' },
        { dev: 'कंस वध प्रभु तुमने कीना ।\nदीन दयालु जगत को दीना ॥', en: 'Kaṁsa vadha Prabhu tumane kīnā,\nDīna dayālu jagata ko dīnā.' },
        { dev: 'अर्जुन को गीता सुनाई ।\nकर्मयोग की राह दिखाई ॥', en: 'Arjuna ko Gītā sunāī,\nKarmayoga kī rāha dikhāī.' },
        { dev: 'देवकी माता जिनके प्यारे ।\nवसुदेव पिता गुण के न्यारे ॥', en: 'Devakī mātā jinake pyāre,\nVasudeva pitā guṇa ke nyāre.' },
        { dev: 'कारागृह में तुम अवतारे ।\nमथुरा नगरी में लीला सारे ॥', en: 'Kārāgṛha meṁ tuma avatāre,\nMathurā nagarī meṁ līlā sāre.' },
        { dev: 'गोकुल में तुम लीला दिखाई ।\nनंद यशोदा मन सुख पाई ॥', en: 'Gokula meṁ tuma līlā dikhāī,\nNanda Yaśodā mana sukha pāī.' },
        { dev: 'पूतना को तुम मारि गिरायो ।\nतृणावर्त वध किये सुख पायो ॥', en: 'Pūtanā ko tuma māri girāyo,\nTṛṇāvarta vadha kiye sukha pāyo.' },
        { dev: 'शकटासुर संग बकासुर मारे ।\nअघासुर भी तुमने संहारे ॥', en: 'Śakaṭāsura saṅga Bakāsura māre,\nAghāsura bhī tumane saṁhāre.' },
        { dev: 'ब्रह्मा जी ने ग्वाल चुराये ।\nतुम स्वयं बहुत रूप बनाये ॥', en: 'Brahmā jī ne gvāla churāye,\nTuma svayaṁ bahuta rūpa banāye.' },
        { dev: 'कालिया नाग को तुमने नाथा ।\nयमुना जल में नृत्य कर साथा ॥', en: 'Kāliyā Nāga ko tumane nāthā,\nYamunā jala meṁ nṛtya kara sāthā.' },
        { dev: 'गोवर्धन तुम उंगली उठाई ।\nइंद्र का गर्व चूर कर भाई ॥', en: 'Govardhana tuma uṅgalī uṭhāī,\nIndra kā garva chūra kara bhāī.' },
        { dev: 'सात दिवस गिरि धारण कीना ।\nब्रज वासिन को अभय प्रदान दीना ॥', en: 'Sāta divasa giri dhāraṇa kīnā,\nBraja vāsina ko abhaya pradāna dīnā.' },
        { dev: 'गोपिन संग रास रचाई ।\nमुरली मधुर सुर गूँज सुहाई ॥', en: 'Gopina saṅga rāsa rachāī,\nMuralī madhura sura gūṁja suhāī.' },
        { dev: 'चीर हरण तुम लीला कीन्ही ।\nव्रत पूरन गोपियन की कीन्ही ॥', en: 'Chīra haraṇa tuma līlā kīnhī,\nVrata pūrana gopiyana kī kīnhī.' },
        { dev: 'दावानल को पी गये प्रभु आपा ।\nब्रज सब जन का हरे संतापा ॥', en: 'Dāvānala ko pī gaye Prabhu āpā,\nBraja saba jana kā hare santāpā.' },
        { dev: 'अक्रूर संग मथुरा तुम आये ।\nकंस के मल्ल सभी को गिराये ॥', en: 'Akrūra saṅga Mathurā tuma āye,\nKaṁsa ke malla sabhī ko girāye.' },
        { dev: 'चाणूर मुष्टिक मारे भारी ।\nकंस वध कर प्रजा सुखकारी ॥', en: 'Chāṇūra Muṣṭika māre bhārī,\nKaṁsa vadha kara prajā sukhakārī.' },
        { dev: 'उग्रसेन को राज्य दिलायो ।\nमाता पिता बन्धन से छुड़ायो ॥', en: 'Ugrasena ko rājya dilāyo,\nMātā pitā bandhana se chhuḍāyo.' },
        { dev: 'सांदीपनि गुरु आश्रम गये ।\nचौसठ कला चौदह विद्या लये ॥', en: 'Sāndīpani guru āśrama gaye,\nChausaṭha kalā chaudaha vidyā laye.' },
        { dev: 'द्वारिका पुरी बसाई न्यारी ।\nरुक्मिणी सत्यभामा संग प्यारी ॥', en: 'Dvārikā purī basāī nyārī,\nRukmiṇī Satyabhāmā saṅga pyārī.' },
        { dev: 'नरकासुर को तुमने मारा ।\nसोलह सहस कन्या उद्धारा ॥', en: 'Narakāsura ko tumane mārā,\nSolaha sahasa kanyā uddhārā.' },
        { dev: 'पांडवों के तुम सखा सहारे ।\nदुर्योधन के दर्प सब टारे ॥', en: 'Pāṇḍavoṁ ke tuma sakhā sahāre,\nDuryodhana ke darpa saba ṭāre.' },
        { dev: 'द्रौपदी चीर बढ़ायो अपारा ।\nभीष्म पितामह ने तुम्हें पुकारा ॥', en: 'Draupadī chīra baḍhāyo apārā,\nBhīṣma Pitāmaha ne tumheṁ pukārā.' },
        { dev: 'कुरुक्षेत्र में रथ हाँकन लागे ।\nपार्थसारथि बन भय सब भागे ॥', en: 'Kurukṣetra meṁ ratha hāṁkana lāge,\nPārthasārathi bana bhaya saba bhāge.' },
        { dev: 'गीता ज्ञान अमृत बरसायो ।\nमोह अर्जुन का दूर करायो ॥', en: 'Gītā gyāna amṛta barasāyo,\nMoha Arjuna kā dūra karāyo.' },
        { dev: 'विश्वरूप दरशन तुम दीन्हा ।\nअर्जुन को परम ज्ञान प्रदान कीन्हा ॥', en: 'Viśvarūpa darśana tuma dīnhā,\nArjuna ko parama gyāna pradāna kīnhā.' },
        { dev: 'धर्मराज को राजा बनाये ।\nदुष्ट दुर्योधन को गिराये ॥', en: 'Dharmarāja ko rājā banāye,\nDuṣṭa Duryodhana ko girāye.' },
        { dev: 'सुदामा की गरीबी हरी ।\nमित्र प्रेम की रीत खरी ॥', en: 'Sudāmā kī garībī harī,\nMitra prema kī rīta kharī.' },
        { dev: 'तांदुल देखि प्रेम बरसायो ।\nसुदामा को ऐश्वर्य दिलायो ॥', en: 'Tāndula dekhi prema barasāyo,\nSudāmā ko aiśvarya dilāyo.' },
        { dev: 'विदुर के घर शाक जो खायो ।\nभक्त प्रेम से प्रभु सुख पायो ॥', en: 'Vidura ke ghara śāka jo khāyo,\nBhakta prema se Prabhu sukha pāyo.' },
        { dev: 'तुम्हरे भजन जो नर नित गावै ।\nसो सुख सम्पत्ति सदा पावै ॥', en: 'Tumhare bhajana jo nara nita gāvai,\nSo sukha sampatti sadā pāvai.' },
        { dev: 'कृष्ण नाम जो ले नर प्राणी ।\nताको मिले मोक्ष कल्याणी ॥', en: 'Kṛṣṇa nāma jo le nara prāṇī,\nTāko mile mokṣa kalyāṇī.' },
        { dev: 'कृष्ण चालीसा जो नित गावै ।\nसब सुख भोगि परमपद पावै ॥', en: 'Kṛṣṇa Chālīsā jo nita gāvai,\nSaba sukha bhogi paramapada pāvai.' },
        { label: 'Doha', dev: 'कृष्ण चालीसा पढ़ै, प्रेम सहित जो कोय ।\nद्वारिकाधीश प्रसन्न हो, अमित सुख सुख होय ॥', en: 'Kṛṣṇa Chālīsā paḍhai, prema sahita jo koya,\nDvārikādhīśa prasanna ho, amita sukha sukha hoya.' }
      ]
    },
    {
      id: 'madhurashtakam',
      name: 'Madhurashtakam',
      nameDev: 'मधुराष्टकम्',
      deity: 'krishna',
      deityName: 'Lord Krishna',
      deityDev: 'कृष्ण',
      type: 'stotra',
      verses: [
        { dev: 'अधरं मधुरं वदनं मधुरं\nनयनं मधुरं हसितं मधुरम् ।\nहृदयं मधुरं गमनं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Adharaṁ madhuraṁ vadanaṁ madhuraṁ\nNayanaṁ madhuraṁ hasitaṁ madhuram,\nHṛdayaṁ madhuraṁ gamanaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'वचनं मधुरं चरितं मधुरं\nवसनं मधुरं वलितं मधुरम् ।\nचलितं मधुरं भ्रमितं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Vachanaṁ madhuraṁ charitaṁ madhuraṁ\nVasanaṁ madhuraṁ valitaṁ madhuram,\nChalitaṁ madhuraṁ bhramitaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'वेणुर्मधुरो रेणुर्मधुरः\nपाणिर्मधुरः पादौ मधुरौ ।\nनृत्यं मधुरं सख्यं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Veṇurmadhuro reṇurmadhuraḥ\nPāṇirmadhuraḥ pādau madhurau,\nNṛtyaṁ madhuraṁ sakhyaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'गीतं मधुरं पीतं मधुरं\nभुक्तं मधुरं सुप्तं मधुरम् ।\nरूपं मधुरं तिलकं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Gītaṁ madhuraṁ pītaṁ madhuraṁ\nBhuktaṁ madhuraṁ suptaṁ madhuram,\nRūpaṁ madhuraṁ tilakaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'करणं मधुरं तरणं मधुरं\nहरणं मधुरं स्मरणं मधुरम् ।\nवमितं मधुरं शमितं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Karaṇaṁ madhuraṁ taraṇaṁ madhuraṁ\nHaraṇaṁ madhuraṁ smaraṇaṁ madhuram,\nVamitaṁ madhuraṁ śamitaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'गुञ्जा मधुरा माला मधुरा\nयमुना मधुरा वीची मधुरा ।\nसलिलं मधुरं कमलं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Guñjā madhurā mālā madhurā\nYamunā madhurā vīchī madhurā,\nSalilaṁ madhuraṁ kamalaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'गोपी मधुरा लीला मधुरा\nयुक्तं मधुरं मुक्तं मधुरम् ।\nदृष्टं मधुरं शिष्टं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Gopī madhurā līlā madhurā\nYuktaṁ madhuraṁ muktaṁ madhuram,\nDṛṣṭaṁ madhuraṁ śiṣṭaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'गोपा मधुरा गावो मधुरा\nयष्टिर्मधुरा सृष्टिर्मधुरा ।\nदलितं मधुरं फलितं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Gopā madhurā gāvo madhurā\nYaṣṭirmadhurā sṛṣṭirmadhurā,\nDalitaṁ madhuraṁ phalitaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' }
      ]
    },
    {
      id: 'achyutashtakam',
      name: 'Achyutashtakam',
      nameDev: 'अच्युताष्टकम्',
      deity: 'krishna',
      deityName: 'Lord Krishna',
      deityDev: 'कृष्ण',
      type: 'stotra',
      verses: [
        { dev: 'अच्युतं केशवं रामनारायणं\nकृष्णदामोदरं वासुदेवं हरिम् ।\nश्रीधरं माधवं गोपिकावल्लभं\nजानकीनायकं रामचन्द्रं भजे ॥', en: 'Achyutaṁ Keśavaṁ Rāmanārāyaṇaṁ\nKṛṣṇaDāmodaraṁ Vāsudevaṁ Harim,\nŚrīdharaṁ Mādhavaṁ Gopikāvallabhaṁ\nJānakīnāyakaṁ Rāmachandraṁ bhaje.' },
        { dev: 'अच्युतं केशवं सत्यभामाधवं\nमाधवं श्रीधरं राधिकाराधितम् ।\nइन्दिरामन्दिरं चेतसा सुन्दरं\nदेवकीनन्दनं नन्दजं सन्दधे ॥', en: 'Achyutaṁ Keśavaṁ Satyabhāmādhavaṁ\nMādhavaṁ Śrīdharaṁ Rādhikārādhitam,\nIndirāmandiraṁ chetasā sundaraṁ\nDevakīnandanaṁ Nandajaṁ sandadhe.' },
        { dev: 'विष्णवे जिष्णवे शंखिने चक्रिणे\nरुक्मिणीराजिताय जानकीवल्लभाय ।\nवल्लवीवल्लभाय आर्चिताय आत्मने\nकंसविध्वंसिने वंशिने ते नमः ॥', en: 'Viṣṇave jiṣṇave śaṅkhine chakriṇe\nRukmiṇīrājitāya Jānakīvallabhāya,\nVallavīvallabhāya ārchitāya ātmane\nKaṁsavidhvaṁsine vaṁśine te namaḥ.' },
        { dev: 'कृष्ण गोविन्द हे राम नारायण\nश्रीपते वासुदेवाजित श्रीनिधे ।\nअच्युतानन्त हे माधवाधोक्षज\nद्वारकानायक द्रौपदीरक्षक ॥', en: 'Kṛṣṇa Govinda he Rāma Nārāyaṇa\nŚrīpate Vāsudevājita Śrīnidhe,\nAchyutānanta he Mādhavādhokṣaja\nDvārakānāyaka Draupadīrakṣaka.' },
        { dev: 'राजीवनेत्राय चक्रायुधाय\nराजीवनाभाय गोपालरूपिणे ।\nभूपालपालाय बुद्ध्यात्मकाय\nदामोदराय अनन्ताय ते नमः ॥', en: 'Rājīvanetrāya chakrāyudhāya\nRājīvanābhāya Gopālarūpiṇe,\nBhūpālapālāya buddhyātmakāya\nDāmodarāya Anantāya te namaḥ.' },
        { dev: 'लक्ष्मीपते कमलनाभ सुरेश\nविश्वेश विश्व भवनाश्रय श्रीश ।\nअनन्तमूर्ते इह मुक्तिदानन्दे\nगोविन्द गोपगणनाथ नमस्ते ॥', en: 'Lakṣmīpate Kamalanābha Sureśa\nViśveśa viśva bhavanāśraya Śrīśa,\nAnantamūrte iha muktidānande\nGovinda Gopagaṇanātha namaste.' },
        { dev: 'नमः केशवाय नमो नारायण\nनमो मोहनाय नमो गोपालाय ।\nकृष्ण केशव करुणासागर\nशरणागतानां शरणं प्रपद्ये ॥', en: 'Namaḥ Keśavāya namo Nārāyaṇa\nNamo Mohanāya namo Gopālāya,\nKṛṣṇa Keśava Karuṇāsāgara\nŚaraṇāgatānāṁ śaraṇaṁ prapadye.' },
        { dev: 'अच्युतं केशवं विष्णुमेव स्मरन्\nकृष्ण कृष्णेति गायन् सदानन्दवान् ।\nहरिमीडे सुदाम प्रियं रुक्मिणी\nवल्लभं कंसमर्दि स्मरामि स्मरम् ॥', en: 'Achyutaṁ Keśavaṁ Viṣṇumeva smaran\nKṛṣṇa Kṛṣṇeti gāyan sadānandavān,\nHarimīḍe Sudāma priyaṁ Rukmiṇī\nVallabhaṁ Kaṁsamardi smarāmi smaram.' }
      ]
    },

    /* ==================================================================
       LORD RAMA
       ================================================================== */
    {
      id: 'ram-chalisa',
      name: 'Ram Chalisa',
      nameDev: 'राम चालीसा',
      deity: 'rama',
      deityName: 'Lord Rama',
      deityDev: 'राम',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'श्री रघुबीर प्रताप ते, सिंधु तरे पाषान ।\nतुलसी ममता राम गुन, लुटत नित्य नव जान ॥', en: 'Śrī Raghubīra pratāpa te, sindhu tare pāṣāna,\nTulasī mamatā Rāma guna, luṭata nitya nava jāna.' },
        { label: 'Chaupai', dev: 'जय राम रूप अनूप राजीव नयन ।\nसीता हरण हरि राज दशरथ नंदन ॥', en: 'Jaya Rāma rūpa anūpa rājīva nayana,\nSītā haraṇa Hari Rāja Daśaratha Nandana.' },
        { dev: 'कौशल्या सुत राम दशरथ के प्यारे ।\nताड़का मारि सुबाहु संग दुष्ट संहारे ॥', en: 'Kausalyā suta Rāma Daśaratha ke pyāre,\nTāḍakā māri Subāhu saṅga duṣṭa saṁhāre.' },
        { dev: 'गौतम नारि तारन प्रभु जनक दुलारी ।\nसीता स्वयंवर जीत प्रभु धनुष तोड़ भारी ॥', en: 'Gautama nāri tāraṇa Prabhu Janaka dulārī,\nSītā svayaṁvara jīta Prabhu dhanuṣa toḍa bhārī.' },
        { dev: 'सिया राम जी की जय, लखन जी की जय ।\nविश्वामित्र ऋषि यज्ञ रक्षा सब भय ॥', en: 'Siyā Rāma jī kī jaya, Lakhana jī kī jaya,\nViśvāmitra ṛṣi yagya rakṣā saba bhaya.' },
        { dev: 'पिता वचन मानि बन गमन कीन्हा ।\nसिय लखन संग सुख सब सहि लीन्हा ॥', en: 'Pitā vachana māni bana gamana kīnhā,\nSiya Lakhana saṅga sukha saba sahi līnhā.' },
        { dev: 'चित्रकूट बिलसत रघुराई ।\nभरत मिलाप भई सुखदाई ॥', en: 'Chitrakūṭa bilasata Raghurāī,\nBharata milāpa bhaī sukhadāī.' },
        { dev: 'पंचवटी तुम कीन्ह बसेरा ।\nसीता हरण भयो दुख घनेरा ॥', en: 'Pañchavaṭī tuma kīnha baserā,\nSītā haraṇa bhayo dukha ghanerā.' },
        { dev: 'गीध मरन मुक्ति दई प्रभु सारी ।\nशबरी फल खाये अति प्यारी ॥', en: 'Gīdha marana mukti daī Prabhu sārī,\nŚabarī phala khāye ati pyārī.' },
        { dev: 'सुग्रीव मिलाप कियो हनुमाना ।\nबालि बध किये प्रभु भगवाना ॥', en: 'Sugrīva milāpa kiyo Hanumānā,\nBāli badha kiye Prabhu Bhagavānā.' },
        { dev: 'लंका जारि सिय सुधि लाये ।\nहनुमान बीर बल अपार दिखाये ॥', en: 'Laṅkā jāri Siya sudhi lāye,\nHanumāna bīra bala apāra dikhāye.' },
        { dev: 'सेतु बंधवाय लंक सिधाये ।\nवानर भालु सेन संग लाये ॥', en: 'Setu bandhavāya Laṅka sidhāye,\nVānara bhālū sena saṅga lāye.' },
        { dev: 'रावण से भयो युद्ध अपारा ।\nसब दुष्ट राक्षस किये संहारा ॥', en: 'Rāvaṇa se bhayo yuddha apārā,\nSaba duṣṭa rākṣasa kiye saṁhārā.' },
        { dev: 'कुम्भकरण रावण संहारे ।\nमेघनाद सब मारे प्यारे ॥', en: 'Kumbhakarṇa Rāvaṇa saṁhāre,\nMeghānāda saba māre pyāre.' },
        { dev: 'रावण मारि सिय को लाये ।\nअयोध्या पुरी राज सिंहासन पाये ॥', en: 'Rāvaṇa māri Siya ko lāye,\nAyodhyā purī rāja siṁhāsana pāye.' },
        { dev: 'राम राज बैठे त्रैलोका ।\nधर्म चलत सुख पाये सब लोका ॥', en: 'Rāma rāja baiṭhe trailokā,\nDharma chalata sukha pāye saba lokā.' },
        { dev: 'प्रभु राम तुम्हारी महिमा न्यारी ।\nभक्तन को सदा प्रिय प्यारी ॥', en: 'Prabhu Rāma tumhārī mahimā nyārī,\nBhaktana ko sadā priya pyārī.' },
        { dev: 'सीता राम सदा सुखकारी ।\nभव भय हरण करत भवतारी ॥', en: 'Sītā Rāma sadā sukhakārī,\nBhava bhaya haraṇa karata bhavatārī.' },
        { dev: 'दीन दयालु प्रभु करुणानिधान ।\nशरणागत को करो कल्याण ॥', en: 'Dīna dayālu Prabhu karuṇānidhāna,\nŚaraṇāgata ko karo kalyāṇa.' },
        { dev: 'तुम्हरे भजन राम हित होई ।\nमन क्रम बचन भजे सब कोई ॥', en: 'Tumhare bhajana Rāma hita hoī,\nMana krama bachana bhaje saba koī.' },
        { dev: 'सन्तन सदा रहो अवधारी ।\nपापन शोक दोष दुख हारी ॥', en: 'Santana sadā raho avadhārī,\nPāpana śoka doṣa dukha hārī.' },
        { dev: 'राम चालीसा जो कोई गावै ।\nमन वांछित फल सो पावै ॥', en: 'Rāma Chālīsā jo koī gāvai,\nMana vāṁchhita phala so pāvai.' },
        { label: 'Doha', dev: 'राम चालीसा पढ़ै, श्रद्धा धरि जो कोय ।\nरामचन्द्र की कृपा से, सुख सम्पत्ति सब होय ॥', en: 'Rāma Chālīsā paḍhai, śraddhā dhari jo koya,\nRāmachandra kī kṛpā se, sukha sampatti saba hoya.' }
      ]
    },
    {
      id: 'ram-raksha',
      name: 'Ram Raksha Stotra',
      nameDev: 'राम रक्षा स्तोत्रम्',
      deity: 'rama',
      deityName: 'Lord Rama',
      deityDev: 'राम',
      type: 'stotra',
      verses: [
        { dev: 'ॐ अस्य श्रीरामरक्षास्तोत्रमन्त्रस्य\nबुधकौशिक ऋषिः ।\nश्रीसीतारामचन्द्रो देवता ।\nअनुष्टुप् छन्दः ।\nसीता शक्तिः ।\nश्रीमद्हनुमान् कीलकम् ।\nश्रीरामचन्द्रप्रीत्यर्थे रामरक्षास्तोत्रजपे विनियोगः ॥', en: 'Om asya Śrīrāmarakṣāstotramantrasya\nBudhakauśika ṛṣiḥ,\nŚrīSītārāmachandro devatā,\nAnuṣṭup chandaḥ,\nSītā śaktiḥ,\nŚrīmadHanumān kīlakam,\nŚrīRāmachandraprītyarthe rāmarakṣāstotrajape viniyogaḥ.' },
        { dev: 'चरितं रघुनाथस्य शतकोटिप्रविस्तरम् ।\nएकैकमक्षरं पुंसां महापातकनाशनम् ॥', en: 'Charitaṁ Raghunāthasya śatakoṭipravistaram,\nEkaikamakṣaraṁ puṁsāṁ mahāpātakanāśanam.' },
        { dev: 'ध्यात्वा नीलोत्पलश्यामं रामं राजीवलोचनम् ।\nजानकीलक्ष्मणोपेतं जटामुकुटमण्डितम् ॥', en: 'Dhyātvā nīlotpalaśyāmaṁ Rāmaṁ rājīvalochanam,\nJānakīLakṣmaṇopetaṁ jaṭāmukuṭamaṇḍitam.' },
        { dev: 'रामो राजमणिः सदा विजयते रामं रमेशं भजे\nरामेणाभिहता निशाचरचमू रामाय तस्मै नमः ।\nरामान्नास्ति परायणं परतरं रामस्य दासोस्म्यहं\nरामे चित्तलयः सदा भवतु मे भो राम मामुद्धर ॥', en: 'Rāmo rājamaṇiḥ sadā vijayate Rāmaṁ Rameśaṁ bhaje\nRāmeṇābhihatā niśācharachamū Rāmāya tasmai namaḥ,\nRāmānnāsti parāyaṇaṁ parataraṁ Rāmasya dāsosmy\'ahaṁ\nRāme chittalayaḥ sadā bhavatu me bho Rāma māmuddhra.' },
        { dev: 'रामं दूर्वादलश्यामं पद्माक्षं पीतवाससम् ।\nस्तुवन्ति नामभिर्दिव्यैर्न ते संसारिणो नराः ॥', en: 'Rāmaṁ dūrvādalaśyāmaṁ padmākṣaṁ pītavāsasam,\nStuvanti nāmabhirdivyairna te saṁsāriṇo narāḥ.' },
        { dev: 'रामाय रामभद्राय रामचन्द्राय वेधसे ।\nरघुनाथाय नाथाय सीतायाः पतये नमः ॥', en: 'Rāmāya Rāmabhadrāya Rāmachandrāya vedhase,\nRaghunāthāya nāthāya Sītāyāḥ pataye namaḥ.' },
        { dev: 'श्रीरामं हनुमन्तं वैनतेयं वृकोदरम् ।\nशयने यः स्मरेन्नित्यं दुस्स्वप्नं तस्य नश्यति ॥', en: 'Śrīrāmaṁ Hanumantaṁ Vainateyaṁ Vṛkodaram,\nŚayane yaḥ smarennityaṁ dussvapnaṁ tasya naśyati.' },
        { dev: 'रामेति रामभद्रेति रामचन्द्रेति वा स्मरन् ।\nनरो न लिप्यते पापैर्भुक्तिं मुक्तिं च विन्दति ॥', en: 'Rāmeti Rāmabhadreti Rāmachandreti vā smaran,\nNaro na lipyate pāpairbhuktiṁ muktiṁ cha vindati.' },
        { dev: 'श्रीरामचन्द्रचरणौ मनसा स्मरामि\nश्रीरामचन्द्रचरणौ वचसा गृणामि ।\nश्रीरामचन्द्रचरणौ शिरसा नमामि\nश्रीरामचन्द्रचरणौ शरणं प्रपद्ये ॥', en: 'Śrīrāmachandracharaṇau manasā smarāmi\nŚrīrāmachandracharaṇau vachasā gṛṇāmi,\nŚrīrāmachandracharaṇau śirasā namāmi\nŚrīrāmachandracharaṇau śaraṇaṁ prapadye.' },
        { dev: 'आपदामपहर्तारं दातारं सर्वसम्पदाम् ।\nलोकाभिरामं श्रीरामं भूयो भूयो नमाम्यहम् ॥', en: 'Āpadāmapahartāraṁ dātāraṁ sarvasampadām,\nLokābhirāmaṁ Śrīrāmaṁ bhūyo bhūyo namāmyaham.' },
        { dev: 'रामाय लक्ष्मणदेवाय सीतायै हनूमते ।\nरामरक्षाप्रभावेन सर्वान् रक्षतु सर्वदा ॥', en: 'Rāmāya Lakṣmaṇadevāya Sītāyai Hanūmate,\nRāmarakṣāprabhāvena sarvān rakṣatu sarvadā.' }
      ]
    },
    {
      id: 'ram-stuti',
      name: 'Shri Ram Stuti',
      nameDev: 'श्री राम स्तुति',
      deity: 'rama',
      deityName: 'Lord Rama',
      deityDev: 'राम',
      type: 'stuti',
      verses: [
        { dev: 'श्री रामचन्द्र कृपालु भजु मन हरण भवभय दारुणम् ।\nनवकंज लोचन कंज मुख कर कंज पद कंजारुणम् ॥', en: 'Śrī Rāmachandra kṛpālu bhaju mana haraṇa bhavabhaya dāruṇam,\nNavakanja lochana kanja mukha kara kanja pada kanjāruṇam.' },
        { dev: 'कन्दर्प अगणित अमित छवि नव नील नीरद सुन्दरम् ।\nपट पीत मानहुँ तडित रुचि शुचि नौमि जनक सुतावरम् ॥', en: 'Kandarpa agaṇita amita chhavi nava nīla nīrada sundaram,\nPaṭa pīta mānahuṁ taḍita ruchi śuchi naumi Janaka sutāvaram.' },
        { dev: 'भजु दीनबन्धु दिनेश दानव दैत्य वंश निकन्दनम् ।\nरघुनन्द आनन्दकन्द कोशलचन्द दशरथ नन्दनम् ॥', en: 'Bhaju dīnabandhu dineśa dānava daitya vaṁśa nikandanam,\nRaghunanda ānandakanda Kośalachanda Daśaratha nandanam.' },
        { dev: 'सिर मुकुट कुण्डल तिलक चारु उदारु अंग विभूषणम् ।\nआजानुभुज शर चाप धर संग्राम जित खर दूषणम् ॥', en: 'Sira mukuṭa kuṇḍala tilaka chāru udāru aṅga vibhūṣaṇam,\nĀjānubhuja śara chāpa dhara saṅgrāma jita Khara Dūṣaṇam.' },
        { dev: 'इति वदति तुलसीदास शंकर शेष मुनि मन रंजनम् ।\nमम हृदय कंज निवास कुरु कामादि खल दल गंजनम् ॥', en: 'Iti vadati Tulasīdāsa Śaṅkara Śeṣa muni mana rañjanam,\nMama hṛdaya kañja nivāsa kuru kāmādi khala dala gañjanam.' },
        { dev: 'मनु जाहिं राचेउ मिलिहि सो बरु सहज सुन्दर साँवरो ।\nकरुणा निधान सुजान सील सनेहु जानत रावरो ॥', en: 'Manu jāhiṁ rācheu milihi so baru sahaja sundara sāṁvaro,\nKaruṇā nidhāna sujāna sīla sanehu jānata rāvaro.' },
        { dev: 'एहि भाँति गौरी असीस सुनि सिय सहित हियँ हरषीं अली ।\nतुलसी भवानीह पूजि पुनि पुनि मुदित मन मन्दिर चली ॥', en: 'Ehi bhāṁti Gaurī asīsa suni Siya sahita hiyaṁ haraṣīṁ alī,\nTulasī Bhavānīha pūji puni puni mudita mana mandira chalī.' }
      ]
    },

    /* ==================================================================
       LORD GANESHA
       ================================================================== */
    {
      id: 'ganesh-atharvashirsha',
      name: 'Ganesh Atharvashirsha',
      nameDev: 'गणेश अथर्वशीर्ष',
      deity: 'ganesha',
      deityName: 'Lord Ganesha',
      deityDev: 'गणेश',
      type: 'stotra',
      verses: [
        { dev: 'ॐ भद्रं कर्णेभिः शृणुयाम देवाः ।\nभद्रं पश्येमाक्षभिर्यजत्राः ।\nस्थिरैरंगैस्तुष्टुवांसस्तनूभिः ।\nव्यशेम देवहितं यदायुः ॥', en: 'Om bhadraṁ karṇebhiḥ śṛṇuyāma devāḥ,\nBhadraṁ paśyemākṣabhiryajatrāḥ,\nSthirairangaistuṣṭuvāṁsastanūbhiḥ,\nVyaśema devahitaṁ yadāyuḥ.' },
        { dev: 'ॐ नमस्ते गणपतये ।\nत्वमेव प्रत्यक्षं तत्त्वमसि ।\nत्वमेव केवलं कर्तासि ।\nत्वमेव केवलं धर्तासि ।\nत्वमेव केवलं हर्तासि ।\nत्वमेव सर्वं खल्विदं ब्रह्मासि ।\nत्वं साक्षादात्मासि नित्यम् ॥', en: 'Om namaste Gaṇapataye,\nTvameva pratyakṣaṁ tattvamasi,\nTvameva kevalaṁ kartāsi,\nTvameva kevalaṁ dhartāsi,\nTvameva kevalaṁ hartāsi,\nTvameva sarvaṁ khalvidaṁ brahmāsi,\nTvaṁ sākṣādātmāsi nityam.' },
        { dev: 'ऋतं वच्मि । सत्यं वच्मि ।\nअव त्वं माम् । अव वक्तारम् ।\nअव श्रोतारम् । अव दातारम् ।\nअव धातारम् । अवानूचानमव शिष्यम् ॥', en: 'Ṛtaṁ vachmi, Satyaṁ vachmi,\nAva tvaṁ mām, Ava vaktāram,\nAva śrotāram, Ava dātāram,\nAva dhātāram, Avānūchānamava śiṣyam.' },
        { dev: 'त्वं वाङ्मयस्त्वं चिन्मयः ।\nत्वमानन्दमयस्त्वं ब्रह्ममयः ।\nत्वं सच्चिदानन्दाद्वितीयोऽसि ।\nत्वं प्रत्यक्षं ब्रह्मासि ।\nत्वं ज्ञानमयो विज्ञानमयोऽसि ॥', en: 'Tvaṁ vāṅmayastvaṁ chinmayaḥ,\nTvamānandamayastvaṁ brahmamayaḥ,\nTvaṁ sachchidānandādvitīyo\'si,\nTvaṁ pratyakṣaṁ brahmāsi,\nTvaṁ jñānamayo vijñānamayo\'si.' },
        { dev: 'सर्वं जगदिदं त्वत्तो जायते ।\nसर्वं जगदिदं त्वत्तस्तिष्ठति ।\nसर्वं जगदिदं त्वयि लयमेष्यति ।\nसर्वं जगदिदं त्वयि प्रत्येति ॥', en: 'Sarvaṁ jagadidaṁ tvatto jāyate,\nSarvaṁ jagadidaṁ tvattastiṣṭhati,\nSarvaṁ jagadidaṁ tvayi layameṣyati,\nSarvaṁ jagadidaṁ tvayi pratyeti.' },
        { dev: 'त्वं भूमिरापोऽनलोऽनिलो नभः ।\nत्वं चत्वारि वाक्पदानि ।\nत्वं गुणत्रयातीतः ।\nत्वं अवस्थात्रयातीतः ।\nत्वं देहत्रयातीतः ।\nत्वं कालत्रयातीतः ॥', en: 'Tvaṁ bhūmirāpo\'nalo\'nilo nabhaḥ,\nTvaṁ chatvāri vākpadāni,\nTvaṁ guṇatrayātītaḥ,\nTvaṁ avasthātrayātītaḥ,\nTvaṁ dehatrayātītaḥ,\nTvaṁ kālatrayātītaḥ.' },
        { dev: 'त्वं मूलाधारस्थितोऽसि नित्यम् ।\nत्वं शक्तित्रयात्मकः ।\nत्वां योगिनो ध्यायन्ति नित्यम् ।\nत्वं ब्रह्मा त्वं विष्णुस्त्वं रुद्रस्त्वमिन्द्रस्त्वमग्निस्त्वं\nवायुस्त्वं सूर्यस्त्वं चन्द्रमास्त्वं ब्रह्म भूर्भुवः स्वरोम् ॥', en: 'Tvaṁ mūlādhārasthito\'si nityam,\nTvaṁ śaktitrayātmakaḥ,\nTvāṁ yogino dhyāyanti nityam,\nTvaṁ Brahmā tvaṁ Viṣṇustvaṁ Rudrast-\nvamIndrastvamagnistvam Vāyustvaṁ Sūryastvaṁ\nChandramāstvaṁ Brahma bhūrbhuvaḥ svarom.' },
        { dev: 'गणादिं पूर्वमुच्चार्य वर्णादिं तदनन्तरम् ।\nअनुस्वारः परतरः अर्धेन्दुलसितम् ।\nतारेण ऋद्धम् एतत्तव मनुस्वरूपम् ।\nगकारः पूर्वरूपम् ।\nअकारो मध्यमरूपम् ।\nअनुस्वारश्चान्त्यरूपम् ॥', en: 'Gaṇādiṁ pūrvamuchārya varṇādiṁ tadanantaram,\nAnusvāraḥ parataraḥ ardhendu-lasitam,\nTāreṇa ṛddham etattava manusvarūpam,\nGakāraḥ pūrvarūpam,\nAkāro madhyamarūpam,\nAnusvāraśchāntyarūpam.' },
        { dev: 'एकदन्ताय विद्महे वक्रतुण्डाय धीमहि ।\nतन्नो दन्ती प्रचोदयात् ॥', en: 'Ekadantāya vidmahe Vakratuṇḍāya dhīmahi,\nTanno Dantī prachodayāt.' }
      ]
    },
    {
      id: 'ganesh-chalisa',
      name: 'Ganesh Chalisa',
      nameDev: 'गणेश चालीसा',
      deity: 'ganesha',
      deityName: 'Lord Ganesha',
      deityDev: 'गणेश',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'जय गणपति सदगुणसदन, कविवर बदन कृपाल ।\nविघ्न हरण मंगल करण, जय जय गिरिजालाल ॥', en: 'Jaya Gaṇapati sadaguṇasadana, kavivara badana kṛpāla,\nVighna haraṇa maṅgala karaṇa, jaya jaya Girijālāla.' },
        { label: 'Chaupai', dev: 'जय जय जय गणपति गणराजू ।\nमंगल भरण करण शुभ काजू ॥', en: 'Jaya jaya jaya Gaṇapati Gaṇarājū,\nMaṅgala bharaṇa karaṇa śubha kājū.' },
        { dev: 'जय गजबदन सदन सुखदाता ।\nविश्व विनायक बुद्धि विधाता ॥', en: 'Jaya Gajabadana sadana sukhadātā,\nViśva Vināyaka buddhi vidhātā.' },
        { dev: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥', en: 'Vakratuṇḍa mahākāya sūryakoṭi samaprabha,\nNirvighnaṁ kuru me deva sarvakāryeṣu sarvadā.' },
        { dev: 'प्रथम पूज्य तुम्हें जग माना ।\nप्रभु सब पूजें तव गुण गाना ॥', en: 'Prathama pūjya tumheṁ jaga mānā,\nPrabhu saba pūjeṁ tava guṇa gānā.' },
        { dev: 'कानन कुण्डल लम्बोदर ।\nसूँड़ विशाल त्रिलोचन सुन्दर ॥', en: 'Kānana kuṇḍala Lambodara,\nSūṁḍa viśāla trilochana sundara.' },
        { dev: 'मोदक प्रिय मूषक सवारी ।\nविद्यावारिधि बुद्धि तुम्हारी ॥', en: 'Modaka priya mūṣaka savārī,\nVidyāvāridhi buddhi tumhārī.' },
        { dev: 'मंगलमूर्ति अजित अविनाशी ।\nकरत कृपा सबके घटवासी ॥', en: 'Maṅgalamūrti ajita avināśī,\nKarata kṛpā sabake ghaṭavāsī.' },
        { dev: 'सिन्दूर चढ़त मूषक की सेना ।\nउमा सुवन मंगल को लेना ॥', en: 'Sindūra chaḍhata mūṣaka kī senā,\nUmā suvana maṅgala ko lenā.' },
        { dev: 'गणपति बप्पा मोरया सबके ।\nपुरवहु सबका मनोरथ अबके ॥', en: 'Gaṇapati bappā morayā sabake,\nPuravahu sabakā manoratha abake.' },
        { dev: 'सिद्धि विनायक बुद्धि विधाता ।\nविघ्न हरण कर मंगल दाता ॥', en: 'Siddhi Vināyaka buddhi vidhātā,\nVighna haraṇa kara maṅgala dātā.' },
        { dev: 'शुभ गुण सुन्दर ज्ञान के दाता ।\nसकल विश्व के तुम विधाता ॥', en: 'Śubha guṇa sundara gyāna ke dātā,\nSakala viśva ke tuma vidhātā.' },
        { dev: 'पार्वती सुत गणराज तुम्हारे ।\nशंकर सुवन मन के प्यारे ॥', en: 'Pārvatī suta Gaṇarāja tumhāre,\nŚaṅkara suvana mana ke pyāre.' },
        { dev: 'रिद्धि सिद्धि तव चँवर डुलावें ।\nशुभ सुभग संग बैठी सुहावें ॥', en: 'Riddhi Siddhi tava chaṁvara ḍulāveṁ,\nŚubha subhaga saṅga baiṭhī suhāveṁ.' },
        { dev: 'शुभ लाभ के दोउ पुत्र तुम्हारे ।\nबालक रूप सबहिं मन हारे ॥', en: 'Śubha Lābha ke dou putra tumhāre,\nBālaka rūpa sabahiṁ mana hāre.' },
        { dev: 'देवन शरण गहत जब आये ।\nतब गणपति रक्षा बन आये ॥', en: 'Devana śaraṇa gahata jaba āye,\nTaba Gaṇapati rakṣā bana āye.' },
        { dev: 'किया पृथ्वी प्रदक्षिणा चारी ।\nमातु पिता की कृपा मझारी ॥', en: 'Kiyā pṛthvī pradakṣiṇā chārī,\nMātu pitā kī kṛpā majhārī.' },
        { dev: 'चन्द्र दरश को दोष मिटावो ।\nभक्तन के सब कष्ट हटावो ॥', en: 'Chandra darasha ko doṣa miṭāvo,\nBhaktana ke saba kaṣṭa haṭāvo.' },
        { dev: 'विघ्न विनाशक मंगल कारी ।\nकृपा करो गणनायक भारी ॥', en: 'Vighna vināśaka maṅgala kārī,\nKṛpā karo Gaṇanāyaka bhārī.' },
        { dev: 'प्रथम पूज्य सुर मुनि मन भावे ।\nतुम बिन काज न कोई सुहावे ॥', en: 'Prathama pūjya sura muni mana bhāve,\nTuma bina kāja na koī suhāve.' },
        { dev: 'गणपति चालीसा जो गावै ।\nरिद्धि सिद्धि धन ग्रह पावै ॥', en: 'Gaṇapati Chālīsā jo gāvai,\nRiddhi siddhi dhana graha pāvai.' },
        { dev: 'गणपति सुमिरन करो मन माहीं ।\nसकल सिद्धि अवश्य फल पाहीं ॥', en: 'Gaṇapati sumirana karo mana māhīṁ,\nSakala siddhi avaśya phala pāhīṁ.' },
        { label: 'Doha', dev: 'जय जय श्री गणनायक, सदगुण के भंडार ।\nपूरण करो मनोकामना, करो शत्रु संहार ॥', en: 'Jaya jaya Śrī Gaṇanāyaka, sadaguṇa ke bhaṇḍāra,\nPūraṇa karo manokāmanā, karo śatru saṁhāra.' }
      ]
    },
    {
      id: 'sankat-nashan',
      name: 'Sankat Nashan Ganesh Stotra',
      nameDev: 'संकटनाशन गणेश स्तोत्र',
      deity: 'ganesha',
      deityName: 'Lord Ganesha',
      deityDev: 'गणेश',
      type: 'stotra',
      verses: [
        { dev: 'प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम् ।\nभक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये ॥', en: 'Praṇamya śirasā devaṁ Gaurīputraṁ Vināyakam,\nBhaktāvāsaṁ smarennityamāyuḥkāmārthasiddhaye.' },
        { dev: 'प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम् ।\nतृतीयं कृष्णपिंगाक्षं गजवक्त्रं चतुर्थकम् ॥', en: 'Prathamaṁ Vakratuṇḍaṁ cha Ekadantaṁ dvitīyakam,\nTṛtīyaṁ Kṛṣṇapiṅgākṣaṁ Gajavaktraṁ chaturthakam.' },
        { dev: 'लम्बोदरं पञ्चमं च षष्ठं विकटमेव च ।\nसप्तमं विघ्नराजेन्द्रं धूम्रवर्णं तथाष्टमम् ॥', en: 'Lambodaraṁ pañchamaṁ cha ṣaṣṭhaṁ Vikaṭameva cha,\nSaptamaṁ Vighnarājendraṁ Dhūmravarṇaṁ tathāṣṭamam.' },
        { dev: 'नवमं भालचन्द्रं च दशमं तु विनायकम् ।\nएकादशं गणपतिं द्वादशं तु गजाननम् ॥', en: 'Navamaṁ Bhālachandraṁ cha daśamaṁ tu Vināyakam,\nEkādaśaṁ Gaṇapatiṁ dvādaśaṁ tu Gajānanam.' },
        { dev: 'द्वादशैतानि नामानि त्रिसन्ध्यं यः पठेन्नरः ।\nन च विघ्नभयं तस्य सर्वसिद्धिकरं प्रभो ॥', en: 'Dvādaśaitāni nāmāni trisandhyaṁ yaḥ paṭhennaraḥ,\nNa cha vighnabhayaṁ tasya sarvasiddhikaraṁ Prabho.' }
      ]
    },

    /* ==================================================================
       GODDESS DURGA
       ================================================================== */
    {
      id: 'durga-chalisa',
      name: 'Durga Chalisa',
      nameDev: 'दुर्गा चालीसा',
      deity: 'durga',
      deityName: 'Goddess Durga',
      deityDev: 'दुर्गा',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'नमो नमो दुर्गे सुख करनी ।\nनमो नमो अम्बे दुख हरनी ॥', en: 'Namo namo Durge sukha karanī,\nNamo namo Ambe dukha haranī.' },
        { label: 'Chaupai', dev: 'निरंकार है ज्योति तुम्हारी ।\nतिहूँ लोक फैली उजियारी ॥', en: 'Niraṅkāra hai jyoti tumhārī,\nTihūṁ loka phailī ujiyārī.' },
        { dev: 'शशि ललाट मुख महाविशाला ।\nनेत्र लाल भृकुटी विकराला ॥', en: 'Śaśi lalāṭa mukha mahāviśālā,\nNetra lāla bhṛkuṭī vikarālā.' },
        { dev: 'रूप मातु को अधिक सुहावे ।\nदरश करत जन अति सुख पावे ॥', en: 'Rūpa mātu ko adhika suhāve,\nDarasha karata jana ati sukha pāve.' },
        { dev: 'तुम संसार शक्ति लय कीना ।\nतिहूँ लोक में बल न तीना ॥', en: 'Tuma saṁsāra śakti laya kīnā,\nTihūṁ loka meṁ bala na tīnā.' },
        { dev: 'प्रतिपालत है जग को माता ।\nभक्त वत्सला तू हितकाता ॥', en: 'Pratipālata hai jaga ko mātā,\nBhakta vatsalā tū hitakātā.' },
        { dev: 'सूर्य चन्द्रमा ध्यावत नीके ।\nनारद ऋषि कुम्भज शुक ठीके ॥', en: 'Sūrya chandramā dhyāvata nīke,\nNārada ṛṣi Kumbhaja Śuka ṭhīke.' },
        { dev: 'नगर कोटि में तुम ही विराजे ।\nतिहूँ लोक में डंका बाजे ॥', en: 'Nagara koṭi meṁ tuma hī virāje,\nTihūṁ loka meṁ ḍaṅkā bāje.' },
        { dev: 'शुम्भ निशुम्भ विदारे बहु भारी ।\nरक्तबीज शंखन महिषासुर मारी ॥', en: 'Śumbha Niśumbha vidāre bahu bhārī,\nRaktabīja Śaṅkhana Mahiṣāsura mārī.' },
        { dev: 'ब्रह्मा विष्णु शिव ध्यान लगावें ।\nमाता के गुण रिषि मुनि गावें ॥', en: 'Brahmā Viṣṇu Śiva dhyāna lagāveṁ,\nMātā ke guṇa ṛṣi muni gāveṁ.' },
        { dev: 'चौसठ योगिनि मंगल गावें ।\nनृत्य करत हर्षित चित लावें ॥', en: 'Chausaṭha yoginī maṅgala gāveṁ,\nNṛtya karata harṣita chita lāveṁ.' },
        { dev: 'बाजत ताल मृदंग अपारा ।\nबाजत ढोल मंजीर निशाना ॥', en: 'Bājata tāla mṛdaṅga apārā,\nBājata ḍhola mañjīra niśānā.' },
        { dev: 'सिंह वाहन पर होकर सवारी ।\nदेवन को करती भयहारी ॥', en: 'Siṁha vāhana para hokara savārī,\nDevana ko karatī bhayahārī.' },
        { dev: 'काल रात्रि नहिं जोर तुम्हारे ।\nमहाबली रावण तुम संहारे ॥', en: 'Kāla rātri nahiṁ jora tumhāre,\nMahābalī Rāvaṇa tuma saṁhāre.' },
        { dev: 'चण्ड मुण्ड को खप्पर धारी ।\nसृष्टि भार तुम ही महतारी ॥', en: 'Chaṇḍa Muṇḍa ko khappara dhārī,\nSṛṣṭi bhāra tuma hī mahatārī.' },
        { dev: 'ब्रह्माणी रुद्राणी तुम कामा ।\nशिवा शक्ति तुम सबकी आमा ॥', en: 'Brāhmaṇī Rudrāṇī tuma kāmā,\nŚivā Śakti tuma sabakī āmā.' },
        { dev: 'चौदह भुवन में तुम्हारी माया ।\nअतुल तेज कोई नहिं पाया ॥', en: 'Chaudaha bhuvana meṁ tumhārī māyā,\nAtula teja koī nahiṁ pāyā.' },
        { dev: 'प्रतिपालत है जग जननी ।\nगुण सुमिरत रहत अनन्त धनी ॥', en: 'Pratipālata hai jaga jananī,\nGuṇa sumirata rahata ananta dhanī.' },
        { dev: 'सब जग रचना तुम ही रची ।\nसंहार करो तुम ही अनुची ॥', en: 'Saba jaga rachanā tuma hī rachī,\nSaṁhāra karo tuma hī anuchī.' },
        { dev: 'अन्न वस्त्र तुम सबको देती ।\nसकल मनोरथ पूर्ण तू करती ॥', en: 'Anna vastra tuma sabako detī,\nSakala manoratha pūrṇa tū karatī.' },
        { dev: 'शिलाजंग तुम पर्वत रानी ।\nसुंदर दरबार तुम्हारा प्राणी ॥', en: 'Śilājaṅga tuma parvata rānī,\nSundara darabāra tumhārā prāṇī.' },
        { dev: 'दुर्गा पूजा दीप जलाये ।\nमहिमा पूजें जग में छाये ॥', en: 'Durgā pūjā dīpa jalāye,\nMahimā pūjeṁ jaga meṁ chhāye.' },
        { dev: 'माँ शेरावाली दया निधाना ।\nभक्तन को देती विज्ञाना ॥', en: 'Māṁ Śerāvālī dayā nidhānā,\nBhaktana ko detī vigyānā.' },
        { dev: 'जो सर संध्या माता तेरी भक्ती करें ।\nसो धन जन सुख पावें परलोक सुख तरें ॥', en: 'Jo sara sandhyā mātā terī bhaktī kareṁ,\nSo dhana jana sukha pāveṁ paraloka sukha tareṁ.' },
        { dev: 'दुर्गा चालीसा जो कोई गावै ।\nसब सुख भोग परमपद पावै ॥', en: 'Durgā Chālīsā jo koī gāvai,\nSaba sukha bhoga paramapada pāvai.' },
        { label: 'Doha', dev: 'देवी दुर्गा का भक्त, सदा सुखी हो जाय ।\nआपदा विपदा नशे, दर्शन करत सुभाय ॥', en: 'Devī Durgā kā bhakta, sadā sukhī ho jāya,\nĀpadā vipadā naśe, darśana karata subhāya.' }
      ]
    },
    {
      id: 'argala',
      name: 'Argala Stotram',
      nameDev: 'अर्गला स्तोत्रम्',
      deity: 'durga',
      deityName: 'Goddess Durga',
      deityDev: 'दुर्गा',
      type: 'stotra',
      verses: [
        { dev: 'ॐ जय त्वं देवि चामुण्डे जय भूतापहारिणि ।\nजय सर्वगते देवि कालरात्रि नमोऽस्तु ते ॥', en: 'Om jaya tvaṁ Devi Chāmuṇḍe jaya bhūtāpahāriṇi,\nJaya sarvagate Devi Kālarātri namo\'stu te.' },
        { dev: 'जयन्ती मंगला काली भद्रकाली कपालिनी ।\nदुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते ॥', en: 'Jayantī Maṅgalā Kālī Bhadrakālī Kapālinī,\nDurgā Kṣamā Śivā Dhātrī Svāhā Svadhā namo\'stu te.' },
        { dev: 'मधुकैटभविध्वंसि विधातृवरदे नमः ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Madhukaiṭabhavidhvaṁsi vidhātṛvarade namaḥ,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'महिषासुरनिर्नाशि भक्तानां सुखदे नमः ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Mahiṣāsuranirṇāśi bhaktānāṁ sukhade namaḥ,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'धूम्रनेत्रवधे देवि धर्मकामार्थदायिनि ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Dhūmranetravadhe Devi dharmakāmārthadāyini,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'रक्तबीजवधे देवि चण्डमुण्डविनाशिनि ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Raktabījavadhe Devi Chaṇḍamuṇḍavināśini,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'शुम्भस्यैव निशुम्भस्य धूम्राक्षस्य च मर्दिनि ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Śumbhasyaiva Niśumbhasya Dhūmrākṣasya cha mardini,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'वन्दिताङ्घ्रियुगे देवि सर्वसौभाग्यदायिनि ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Vanditāṅghriyuge Devi sarvasaubhāgyadāyini,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'अचिन्त्यरूपचरिते सर्वशत्रुविनाशिनि ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Achintyarūpacharite sarvaśatruvināśini,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'नतेभ्यः सर्वदा भक्त्या चण्डिके दुरितापहे ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Natebhyaḥ sarvadā bhaktyā Chaṇḍike duritāpahe,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'पत्नीं मनोरमां देहि मनोवृत्तानुसारिणीम् ।\nतारिणीं दुर्गसंसारसागरस्य कुलोद्भवाम् ॥', en: 'Patnīṁ manoramāṁ dehi manovṛttānusāriṇīm,\nTāriṇīṁ durgasaṁsārasāgarasya kulodbhavām.' },
        { dev: 'इदं स्तोत्रं पठित्वा तु महास्तोत्रं पठेन्नरः ।\nसप्तशतीं समाराध्य वरमाप्नोति दुर्लभम् ॥', en: 'Idaṁ stotraṁ paṭhitvā tu mahāstotraṁ paṭhennaraḥ,\nSaptaśatīṁ samārādhya varamāpnoti durlabham.' }
      ]
    },

    /* ==================================================================
       GODDESS LAKSHMI
       ================================================================== */
    {
      id: 'lakshmi-chalisa',
      name: 'Lakshmi Chalisa',
      nameDev: 'लक्ष्मी चालीसा',
      deity: 'lakshmi',
      deityName: 'Goddess Lakshmi',
      deityDev: 'लक्ष्मी',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'मातु लक्ष्मी करि कृपा, करो हृदय में वास ।\nमनोकामना सिद्ध करो, पूरण करो मम आस ॥', en: 'Mātu Lakṣmī kari kṛpā, karo hṛdaya meṁ vāsa,\nManokāmanā siddha karo, pūraṇa karo mama āsa.' },
        { label: 'Chaupai', dev: 'सिन्धु सुता मैं सुमिरौं तोही ।\nकृपा करो जगदम्बा मोही ॥', en: 'Sindhu sutā maiṁ sumirauṁ tohī,\nKṛpā karo Jagadambā mohī.' },
        { dev: 'क्षीर सिन्धु जब विष्णु मथायो ।\nचौदह रतन सिन्धु में पायो ॥', en: 'Kṣīra sindhu jaba Viṣṇu mathāyo,\nChaudaha ratana sindhu meṁ pāyo.' },
        { dev: 'चौदह रतन में तुम सुखरासी ।\nसेवा कियो प्रभु बने बिलासी ॥', en: 'Chaudaha ratana meṁ tuma sukharāsī,\nSevā kiyo Prabhu bane bilāsī.' },
        { dev: 'जिस घर तुम रहतीं तिस में हैं ।\nसदगुण धर्म सभी सुख लहैं ॥', en: 'Jisa ghara tuma rahatīṁ tisa meṁ haiṁ,\nSadaguṇa dharma sabhī sukha lahaiṁ.' },
        { dev: 'सुन्दर बदन चतुर्भुज धारी ।\nकमल विराजत शोभा न्यारी ॥', en: 'Sundara badana chaturbhuja dhārī,\nKamala virājata śobhā nyārī.' },
        { dev: 'स्वर्ण मुकुट शिर ऊपर सोहै ।\nचन्द्रबदनी मन को मोहै ॥', en: 'Svarṇa mukuṭa śira ūpara sohai,\nChandrabadanī mana ko mohai.' },
        { dev: 'गज राजन तुम को नहलावें ।\nशुभ करनी के सुयश सुनावें ॥', en: 'Gaja rājana tuma ko nahalāveṁ,\nŚubha karanī ke suyaśa sunāveṁ.' },
        { dev: 'कमला विराजत कमल सवारी ।\nसब रस रूप मनोहर भारी ॥', en: 'Kamalā virājata kamala savārī,\nSaba rasa rūpa manohara bhārī.' },
        { dev: 'ब्रह्मा विष्णु शंभु मिल आये ।\nगुण गावत तव नाम सुनाये ॥', en: 'Brahmā Viṣṇu Śambhu mili āye,\nGuṇa gāvata tava nāma sunāye.' },
        { dev: 'नारद कुम्भज शिव सनकादी ।\nनित तव यश गावत हर्षत आदी ॥', en: 'Nārada Kumbhaja Śiva Sanakādī,\nNita tava yaśa gāvata harṣata ādī.' },
        { dev: 'सकल देवता तव जस गावें ।\nचरणन में शीश नवावें ॥', en: 'Sakala devatā tava jasa gāveṁ,\nCharaṇana meṁ śīśa navāveṁ.' },
        { dev: 'ऋद्धि सिद्धि माँ तव सेवकाई ।\nसनत कुमार शेष मुनि ध्याई ॥', en: 'Ṛddhi siddhi māṁ tava sevakāī,\nSanata Kumāra Śeṣa muni dhyāī.' },
        { dev: 'तुम ही पाताल बसी हो जाती ।\nतुम ही शेष शयन सुखदाती ॥', en: 'Tuma hī pātāla basī ho jātī,\nTuma hī Śeṣa śayana sukhadātī.' },
        { dev: 'श्री नारायण के संग रहो तुम ।\nसब सुख देती भगवती तुम ॥', en: 'Śrī Nārāyaṇa ke saṅga raho tuma,\nSaba sukha detī Bhagavatī tuma.' },
        { dev: 'धन सम्पदा सदा दे माता ।\nभक्तन को नहिं बिसरो भाता ॥', en: 'Dhana sampadā sadā de mātā,\nBhaktana ko nahiṁ bisaro bhātā.' },
        { dev: 'जिस नर को तुम दृष्टि दिखाओ ।\nताको सदा विपत्ति हटाओ ॥', en: 'Jisa nara ko tuma dṛṣṭi dikhāo,\nTāko sadā vipatti haṭāo.' },
        { dev: 'जो यह चालीसा पढ़ जावे ।\nधन धान्य ऐश्वर्य सब पावे ॥', en: 'Jo yaha Chālīsā paḍha jāve,\nDhana dhānya aiśvarya saba pāve.' },
        { dev: 'लक्ष्मी चालीसा जो गावे ।\nभव सागर तरि पार हो जावे ॥', en: 'Lakṣmī Chālīsā jo gāve,\nBhava sāgara tari pāra ho jāve.' },
        { dev: 'पुत्र पौत्र से भरो भंडारा ।\nसन्तान सुख को पूर्ण करो सारा ॥', en: 'Putra pautra se bharo bhaṇḍārā,\nSantāna sukha ko pūrṇa karo sārā.' },
        { dev: 'आठों सिद्धि दो नव निधि दाती ।\nसकल मनोरथ पूरण माती ॥', en: 'Āṭhoṁ siddhi do nava nidhi dātī,\nSakala manoratha pūraṇa mātī.' },
        { label: 'Doha', dev: 'लक्ष्मी चालीसा पढ़ें, भक्तिभाव लय ध्यान ।\nता पर कृपा लक्ष्मी की, सदा मिले सम्मान ॥', en: 'Lakṣmī Chālīsā paḍheṁ, bhaktibhāva laya dhyāna,\nTā para kṛpā Lakṣmī kī, sadā mile sammāna.' }
      ]
    },
    {
      id: 'shri-suktam',
      name: 'Shri Suktam',
      nameDev: 'श्री सूक्तम्',
      deity: 'lakshmi',
      deityName: 'Goddess Lakshmi',
      deityDev: 'लक्ष्मी',
      type: 'stotra',
      verses: [
        { dev: 'ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम् ।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥', en: 'Om Hiraṇyavarṇāṁ hariṇīṁ suvarṇarajatasrajām,\nChandrāṁ hiraṇmayīṁ Lakṣmīṁ jātavedo ma āvaha.' },
        { dev: 'तां म आवह जातवेदो लक्ष्मीमनपगामिनीम् ।\nयस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम् ॥', en: 'Tāṁ ma āvaha jātavedo Lakṣmīmanapagāminīm,\nYasyāṁ hiraṇyaṁ vindeyaṁ gāmaśvaṁ puruṣānaham.' },
        { dev: 'अश्वपूर्वां रथमध्यां हस्तिनादप्रबोधिनीम् ।\nश्रियं देवीमुपह्वये श्रीर्मा देवी जुषताम् ॥', en: 'Aśvapūrvāṁ rathamadhyāṁ hastinādaprabodhinīm,\nŚriyaṁ Devīmupahvaye Śrīrmā Devī juṣatām.' },
        { dev: 'कांसोऽस्मि हिरण्यं विन्देयं गामश्वं पुरुषानहम् ।\nरथनाभस्य सुक्तानि अश्विना दैव्यः पुत्रौ ॥', en: 'Kāṁso\'smi hiraṇyaṁ vindeyaṁ gāmaśvaṁ puruṣānaham,\nRathanābhasya suktāni Aśvinā daivyaḥ putrau.' },
        { dev: 'आर्द्रां पुष्करिणीं पुष्टिं पिङ्गलां पद्ममालिनीम् ।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥', en: 'Ārdrāṁ puṣkariṇīṁ puṣṭiṁ piṅgalāṁ padmamālinīm,\nChandrāṁ hiraṇmayīṁ Lakṣmīṁ jātavedo ma āvaha.' },
        { dev: 'आर्द्रां यः करिणीं यष्टिं सुवर्णां हेममालिनीम् ।\nसूर्यां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥', en: 'Ārdrāṁ yaḥ kariṇīṁ yaṣṭiṁ suvarṇāṁ hemamālinīm,\nSūryāṁ hiraṇmayīṁ Lakṣmīṁ jātavedo ma āvaha.' },
        { dev: 'तां म आवह जातवेदो लक्ष्मीमनपगामिनीम् ।\nयस्यां हिरण्यं प्रभूतं गावो दास्योऽश्वान् विन्देयं पुरुषानहम् ॥', en: 'Tāṁ ma āvaha jātavedo Lakṣmīmanapagāminīm,\nYasyāṁ hiraṇyaṁ prabhūtaṁ gāvo dāsyo\'śvān vindeyaṁ puruṣānaham.' },
        { dev: 'यः शुचिः प्रयतो भूत्वा जुहुयादाज्यमन्वहम् ।\nश्रियः पञ्चदशर्चं च श्रीकामः सततं जपेत् ॥', en: 'Yaḥ śuchiḥ prayato bhūtvā juhuyādājyamanvaham,\nŚriyaḥ pañchadaśarchaṁ cha śrīkāmaḥ satataṁ japet.' },
        { dev: 'पद्मानने पद्मऊरू पद्माक्षी पद्मसम्भवे ।\nतन्मे भजसि पद्माक्षी येन सौख्यं लभाम्यहम् ॥', en: 'Padmānane PadmaUrū Padmākṣī Padmasambhave,\nTanme bhajasi Padmākṣī yena saukhyaṁ labhāmyaham.' },
        { dev: 'पद्मप्रिये पद्मिनि पद्महस्ते पद्मालये पद्मदलायताक्षि ।\nविश्वप्रिये विष्णुमनोऽनुकूले त्वत्पादपद्मं मयि सन्निधत्स्व ॥', en: 'Padmapriye Padmini Padmahaste Padmālaye Padmadalāyatākṣi,\nViśvapriye Viṣṇumano\'nukūle tvatpādapadmaṁ mayi sannidhatsva.' }
      ]
    },
    {
      id: 'mahalakshmi-ashtakam',
      name: 'Mahalakshmi Ashtakam',
      nameDev: 'महालक्ष्मी अष्टकम्',
      deity: 'lakshmi',
      deityName: 'Goddess Lakshmi',
      deityDev: 'लक्ष्मी',
      type: 'stotra',
      verses: [
        { dev: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते ।\nशंखचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते ॥', en: 'Namaste\'stu Mahāmāye Śrīpīṭhe surapūjite,\nŚaṅkhachakragadāhaste Mahālakṣmi namo\'stu te.' },
        { dev: 'नमस्ते गरुडारूढे कोलासुरभयंकरि ।\nसर्वपापहरे देवि महालक्ष्मि नमोऽस्तु ते ॥', en: 'Namaste Garuḍārūḍhe Kolāsurabhayaṁkari,\nSarvapāpahare Devi Mahālakṣmi namo\'stu te.' },
        { dev: 'सर्वज्ञे सर्ववरदे सर्वदुष्टभयंकरि ।\nसर्वदुःखहरे देवि महालक्ष्मि नमोऽस्तु ते ॥', en: 'Sarvajñe sarvavarade sarvaduṣṭabhayaṁkari,\nSarvaduḥkhahare Devi Mahālakṣmi namo\'stu te.' },
        { dev: 'सिद्धिबुद्धिप्रदे देवि भुक्तिमुक्तिप्रदायिनि ।\nमन्त्रमूर्ते सदा देवि महालक्ष्मि नमोऽस्तु ते ॥', en: 'Siddhibuddhiprade Devi bhuktimuktipradāyini,\nMantramūrte sadā Devi Mahālakṣmi namo\'stu te.' },
        { dev: 'आद्यन्तरहिते देवि आद्यशक्तिमहेश्वरि ।\nयोगजे योगसम्भूते महालक्ष्मि नमोऽस्तु ते ॥', en: 'Ādyantarahite Devi Ādyaśaktimahēśvari,\nYogaje yogasambhūte Mahālakṣmi namo\'stu te.' },
        { dev: 'स्थूलसूक्ष्ममहारौद्रे महाशक्तिमहोदरे ।\nमहापापहरे देवि महालक्ष्मि नमोऽस्तु ते ॥', en: 'Sthūlasūkṣmamahāraudre mahāśaktimahōdare,\nMahāpāpahare Devi Mahālakṣmi namo\'stu te.' },
        { dev: 'पद्मासनस्थिते देवि परब्रह्मस्वरूपिणि ।\nपरमेशि जगन्मातर्महालक्ष्मि नमोऽस्तु ते ॥', en: 'Padmāsanasthite Devi Parabrahmasvarūpiṇi,\nParameśi jaganmātar Mahālakṣmi namo\'stu te.' },
        { dev: 'श्वेताम्बरधरे देवि नानालंकारभूषिते ।\nजगत्स्थिते जगन्मातर्महालक्ष्मि नमोऽस्तु ते ॥', en: 'Śvetāmbaradhare Devi nānālaṅkārabhūṣite,\nJagatsthite jaganmātar Mahālakṣmi namo\'stu te.' },
        { dev: 'महालक्ष्म्यष्टकं स्तोत्रं यः पठेद्भक्तिमान्नरः ।\nसर्वसिद्धिमवाप्नोति राज्यं प्राप्नोति सर्वदा ॥', en: 'Mahālakṣmyaṣṭakaṁ stotraṁ yaḥ paṭhedbhaktimānnaraḥ,\nSarvasiddhimavāpnoti rājyaṁ prāpnoti sarvadā.' }
      ]
    },

    /* ==================================================================
       GODDESS SARASWATI
       ================================================================== */
    {
      id: 'saraswati-vandana',
      name: 'Saraswati Vandana',
      nameDev: 'सरस्वती वंदना',
      deity: 'saraswati',
      deityName: 'Goddess Saraswati',
      deityDev: 'सरस्वती',
      type: 'stotra',
      verses: [
        { dev: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ।\nया ब्रह्माच्युतशंकरप्रभृतिभिर्देवैः सदा पूजिता\nसा मां पातु सरस्वती भगवती निःशेषजाड्यापहा ॥', en: 'Yā kundendutuṣārahāradhavalā yā śubhravastrāvṛtā\nYā vīṇāvaradaṇḍamaṇḍitakarā yā śvetapadmāsanā,\nYā Brahmāchyutaśaṅkaraprabhṛtibhirdevaiḥ sadā pūjitā\nSā māṁ pātu Sarasvatī Bhagavatī niḥśeṣajāḍyāpahā.' },
        { dev: 'शुक्लां ब्रह्मविचारसारपरमामाद्यां जगद्व्यापिनीं\nवीणापुस्तकधारिणीमभयदां जाड्यान्धकारापहाम् ।\nहस्ते स्फाटिकमालिकां विदधतीं पद्मासने संस्थितां\nवन्दे तां परमेश्वरीं भगवतीं बुद्धिप्रदां शारदाम् ॥', en: 'Śuklāṁ Brahmavichārasāraparamāmādyāṁ jagadvyāpinīṁ\nVīṇāpustakadariṇīmabhayadāṁ jāḍyāndhakārāpahām,\nHaste sphāṭikamālikāṁ vidadhatīṁ padmāsane saṁsthitāṁ\nVande tāṁ Parameśvarīṁ Bhagavatīṁ buddhipradāṁ Śāradām.' }
      ]
    },
    {
      id: 'saraswati-stotram',
      name: 'Saraswati Stotram',
      nameDev: 'सरस्वती स्तोत्रम्',
      deity: 'saraswati',
      deityName: 'Goddess Saraswati',
      deityDev: 'सरस्वती',
      type: 'stotra',
      verses: [
        { dev: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥', en: 'Sarasvatī namastubhyaṁ varade kāmarūpiṇi,\nVidyārambhaṁ kariṣyāmi siddhirbhavatu me sadā.' },
        { dev: 'पद्मपत्रविशालाक्षी पद्मकेसरवर्णिनी ।\nनित्यं पद्मालया देवी सा मां पातु सरस्वती ॥', en: 'Padmapatraviśālākṣī padmakesaravarṇinī,\nNityaṁ padmālayā Devī sā māṁ pātu Sarasvatī.' },
        { dev: 'सरस्वती नमस्तुभ्यं सर्वदेवि नमो नमः ।\nशान्तरूपे शशिधरे सर्वयोगे नमो नमः ॥', en: 'Sarasvatī namastubhyaṁ sarvadevi namo namaḥ,\nŚāntarūpe śaśidhare sarvayoge namo namaḥ.' },
        { dev: 'नित्यानन्दे निराधारे निष्कलायै नमो नमः ।\nविद्याधरे विशालाक्षि शुद्धज्ञाने नमो नमः ॥', en: 'Nityānande nirādhāre niṣkalāyai namo namaḥ,\nVidyādhare viśālākṣi śuddhajñāne namo namaḥ.' },
        { dev: 'शुद्धस्फटिकरूपायै सूक्ष्मरूपे नमो नमः ।\nशब्दब्रह्मि चतुर्हस्ते सर्वसिद्ध्यै नमो नमः ॥', en: 'Śuddhasphaṭikarūpāyai sūkṣmarūpe namo namaḥ,\nŚabdabrahmi chaturhaste sarvasiddhyai namo namaḥ.' },
        { dev: 'मुक्तालङ्कृतसर्वाङ्गि मुक्तिदे मुक्तरूपिणि ।\nमनश्चन्द्र यशोराशे बुद्धिदे सिद्धिदे नमः ॥', en: 'Muktālaṅkṛtasarvāṅgi muktide muktarūpiṇi,\nManaśchandra yaśorāśe buddhide siddhide namaḥ.' }
      ]
    },

    /* ==================================================================
       GODDESS KALI
       ================================================================== */
    {
      id: 'kali-chalisa',
      name: 'Kali Chalisa',
      nameDev: 'काली चालीसा',
      deity: 'kali',
      deityName: 'Goddess Kali',
      deityDev: 'काली',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'ॐ जय महाकाली माता, जय जय दुर्गा माय ।\nरक्तबीज वध कीजो माता, भक्तन को सुख दाय ॥', en: 'Om jaya Mahākālī mātā, jaya jaya Durgā māya,\nRaktabīja vadha kījo mātā, bhaktana ko sukha dāya.' },
        { label: 'Chaupai', dev: 'कालिका माता शुभ करनी ।\nदुष्ट दलन दुख दारिद हरनी ॥', en: 'Kālikā mātā śubha karanī,\nDuṣṭa dalana dukha dārida haranī.' },
        { dev: 'रक्तबीज को तुमने मारा ।\nशुम्भ निशुम्भ को संहारा ॥', en: 'Raktabīja ko tumane mārā,\nŚumbha Niśumbha ko saṁhārā.' },
        { dev: 'महिषासुर जब अति अभिमानी ।\nतब माता तुम भई भवानी ॥', en: 'Mahiṣāsura jaba ati abhimānī,\nTaba mātā tuma bhaī Bhavānī.' },
        { dev: 'चण्ड मुण्ड को क्षण में मारा ।\nरक्त पिये जग को उबारा ॥', en: 'Chaṇḍa Muṇḍa ko kṣaṇa meṁ mārā,\nRakta piye jaga ko ubārā.' },
        { dev: 'मुण्डमाला गले में सोहे ।\nखड्ग खप्पर कर अरि मन मोहे ॥', en: 'Muṇḍamālā gale meṁ sohe,\nKhaḍga khappara kara ari mana mohe.' },
        { dev: 'लाल वर्ण नेत्र विकरालू ।\nजिह्वा लपलपत अति विशालू ॥', en: 'Lāla varṇa netra vikarālū,\nJihvā lapalapata ati viśālū.' },
        { dev: 'शिव शव पर तुम नृत्य दिखावो ।\nदुष्ट दलन कर भक्त बचावो ॥', en: 'Śiva śava para tuma nṛtya dikhāvo,\nDuṣṭa dalana kara bhakta bachāvo.' },
        { dev: 'दक्षिण में तुम काली प्यारी ।\nसबके दुख हरने वाली न्यारी ॥', en: 'Dakṣiṇa meṁ tuma Kālī pyārī,\nSabake dukha harane vālī nyārī.' },
        { dev: 'तारा मातंगी और भैरवी ।\nधूमावती बगला छिन्नमस्ता रवी ॥', en: 'Tārā Mātaṅgī aura Bhairavī,\nDhūmāvatī Bagalā Chhinnamastā ravī.' },
        { dev: 'दस महाविद्या रूप तुम्हारा ।\nतुम ही करो जग का उद्धारा ॥', en: 'Dasa Mahāvidyā rūpa tumhārā,\nTuma hī karo jaga kā uddhārā.' },
        { dev: 'ब्रह्मा विष्णु शंकर नत माथा ।\nनाम सुनत हो जावे नाथा ॥', en: 'Brahmā Viṣṇu Śaṅkara nata māthā,\nNāma sunata ho jāve nāthā.' },
        { dev: 'श्मशान में वास तुम्हारा ।\nयोगिनी डाकिनी का भंडारा ॥', en: 'Śmaśāna meṁ vāsa tumhārā,\nYoginī Ḍākinī kā bhaṇḍārā.' },
        { dev: 'भैरव संग विचरत माता ।\nतुम बिन सूना लगत विधाता ॥', en: 'Bhairava saṅga vicharata mātā,\nTuma bina sūnā lagata vidhātā.' },
        { dev: 'करो कृपा माता जग तारिणी ।\nभव सागर से पार उतारिणी ॥', en: 'Karo kṛpā mātā jaga tāriṇī,\nBhava sāgara se pāra utāriṇī.' },
        { dev: 'चोर डाकू से रक्षा कीजे ।\nभय भवसागर से तारन दीजे ॥', en: 'Chora ḍākū se rakṣā kīje,\nBhaya bhavasāgara se tārana dīje.' },
        { dev: 'जो जन काली को नित ध्यावै ।\nसो सब सुख सम्पत्ति पावै ॥', en: 'Jo jana Kālī ko nita dhyāvai,\nSo saba sukha sampatti pāvai.' },
        { dev: 'तुम ही आदि शक्ति भवानी ।\nकालरात्रि तुम जग की रानी ॥', en: 'Tuma hī ādi śakti Bhavānī,\nKālarātri tuma jaga kī rānī.' },
        { dev: 'सबके दुख दारिद को हरनी ।\nमाता काली तुम सुखकरनी ॥', en: 'Sabake dukha dārida ko haranī,\nMātā Kālī tuma sukhakaranī.' },
        { dev: 'काली चालीसा जो गावे ।\nबाधा सब नाशे सुख पावे ॥', en: 'Kālī Chālīsā jo gāve,\nBādhā saba nāśe sukha pāve.' },
        { label: 'Doha', dev: 'काली माता के चरण में, नित मेरा प्रणाम ।\nसकल मनोरथ पूर्ण करो, माँ काली सुख धाम ॥', en: 'Kālī mātā ke charaṇa meṁ, nita merā praṇāma,\nSakala manoratha pūrṇa karo, māṁ Kālī sukha dhāma.' }
      ]
    },
    {
      id: 'kali-kavacham',
      name: 'Kali Kavacham',
      nameDev: 'काली कवचम्',
      deity: 'kali',
      deityName: 'Goddess Kali',
      deityDev: 'काली',
      type: 'stotra',
      verses: [
        { dev: 'ॐ ह्रीं काल्यै नमः ।\nनमः शिवायै सौम्यायै सन्ततायै नमो नमः ।\nनमो देव्यै महादेव्यै शिवायै सततं नमः ॥', en: 'Om hrīṁ Kālyai namaḥ,\nNamaḥ Śivāyai Saumyāyai Santatāyai namo namaḥ,\nNamo Devyai Mahādevyai Śivāyai satataṁ namaḥ.' },
        { dev: 'ॐ काली रक्षतु शीर्षं ह्रीं काली रक्षतु ललाटम् ।\nक्लीं काली रक्षतु मुखं ह्रूं काली रक्षतु हृदयम् ॥', en: 'Om Kālī rakṣatu śīrṣaṁ hrīṁ Kālī rakṣatu lalāṭam,\nKlīṁ Kālī rakṣatu mukhaṁ hrūṁ Kālī rakṣatu hṛdayam.' },
        { dev: 'क्रीं काली रक्षतु कण्ठं ह्रीं काली रक्षतु वक्षसम् ।\nह्रीं काली रक्षतु बाहू श्रीं काली रक्षतु करौ ॥', en: 'Krīṁ Kālī rakṣatu kaṇṭhaṁ hrīṁ Kālī rakṣatu vakṣasam,\nHrīṁ Kālī rakṣatu bāhū Śrīṁ Kālī rakṣatu karau.' },
        { dev: 'क्रीं काली रक्षतु पृष्ठं ह्रीं काली रक्षतु कटिम् ।\nह्रूं काली रक्षतु जंघे ह्रीं काली रक्षतु पादौ ॥', en: 'Krīṁ Kālī rakṣatu pṛṣṭhaṁ hrīṁ Kālī rakṣatu kaṭim,\nHrūṁ Kālī rakṣatu jaṅghe hrīṁ Kālī rakṣatu pādau.' },
        { dev: 'सर्वाङ्गं मे सदा पातु काली दुर्गे नमो नमः ।\nइदं कवचमज्ञात्वा यो जपेत् काली मनुम् ।\nन चाप्नोति फलं तस्य परं च नरकं व्रजेत् ॥', en: 'Sarvāṅgaṁ me sadā pātu Kālī Durge namo namaḥ,\nIdaṁ kavachamajñātvā yo japet Kālī manum,\nNa chāpnoti phalaṁ tasya paraṁ cha narakaṁ vrajet.' }
      ]
    },

    /* ==================================================================
       SHANI DEV
       ================================================================== */
    {
      id: 'shani-chalisa',
      name: 'Shani Chalisa',
      nameDev: 'शनि चालीसा',
      deity: 'shani',
      deityName: 'Lord Shani',
      deityDev: 'शनि',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'जय गणेश गिरिजा सुवन, मंगल करण कृपाल ।\nदीनन के दुख हरण करू, शनि देव महाकाल ॥', en: 'Jaya Gaṇeśa Girijā suvana, maṅgala karaṇa kṛpāla,\nDīnana ke dukha haraṇa karū, Śani Deva Mahākāla.' },
        { label: 'Chaupai', dev: 'जय जय श्री शनिदेव प्रभु, सुनिये मेरी अर्ज ।\nकरिये कृपा हे कर्मफलदाता, करिये पाप विसर्ज ॥', en: 'Jaya jaya Śrī Śanideva Prabhu, suniye merī arja,\nKariye kṛpā he karmaphaladātā, kariye pāpa visarja.' },
        { dev: 'शनि देव जब प्रसन्न होते ।\nसुख सम्पदा भक्तन को देते ॥', en: 'Śani Deva jaba prasanna hote,\nSukha sampadā bhaktana ko dete.' },
        { dev: 'को नहिं जानत तव महिमा ।\nतव ग्रह गोचर अमित अपरिमा ॥', en: 'Ko nahiṁ jānata tava mahimā,\nTava graha gochara amita aparimā.' },
        { dev: 'सूर्यपुत्र प्रभु छायानन्दन ।\nयम के बन्धु कर्मफल चंदन ॥', en: 'Sūryaputra Prabhu Chhāyānandana,\nYama ke bandhu karmaphala chandana.' },
        { dev: 'नीलवर्ण नीलाम्बर धारी ।\nकृशकाय लम्बित केश भारी ॥', en: 'Nīlavarṇa nīlāmbara dhārī,\nKṛśakāya lambita keśa bhārī.' },
        { dev: 'कौवा वाहन कृष्ण अधारी ।\nकर्मफल दाता जग हितकारी ॥', en: 'Kauvā vāhana Kṛṣṇa adhārī,\nKarmaphala dātā jaga hitakārī.' },
        { dev: 'श्री शनिदेव दयालु कृपाला ।\nभक्तन हित सदा प्रतिपाला ॥', en: 'Śrī Śanideva dayālu kṛpālā,\nBhaktana hita sadā pratipālā.' },
        { dev: 'साढ़ेसाती का भय निवारो ।\nढैय्या से भी रक्षा हमारो ॥', en: 'Sāḍhesātī kā bhaya nivāro,\nḌhaiyyā se bhī rakṣā hamāro.' },
        { dev: 'राजा दशरथ पर दृष्ट डारी ।\nहरि राम बनवास भयो भारी ॥', en: 'Rājā Daśaratha para dṛṣṭa ḍārī,\nHari Rāma banavāsa bhayo bhārī.' },
        { dev: 'राजा विक्रमादित्य सताया ।\nपर निज भक्ति से उन्हें बचाया ॥', en: 'Rājā Vikramāditya satāyā,\nPara nija bhakti se unheṁ bachāyā.' },
        { dev: 'पांडव पर जब साढ़ेसाती ।\nभयो द्रौपदी चीरहरण सम्पाती ॥', en: 'Pāṇḍava para jaba sāḍhesātī,\nBhayo Draupadī chīraharaṇa sampātī.' },
        { dev: 'नल राजा को किया बेहाल ।\nशनि दशा लागी अति विकराल ॥', en: 'Nala rājā ko kiyā behāla,\nŚani daśā lāgī ati vikarāla.' },
        { dev: 'राहु केतु संग मिलि जब आवें ।\nभारी पीड़ा जन मन को पावें ॥', en: 'Rāhu Ketu saṅga mili jaba āveṁ,\nBhārī pīḍā jana mana ko pāveṁ.' },
        { dev: 'तेल तिलादि शनिवार चढ़ावो ।\nकष्ट कठिन सब दूर भगावो ॥', en: 'Tela tilādi Śanivāra chaḍhāvo,\nKaṣṭa kaṭhina saba dūra bhagāvo.' },
        { dev: 'पीपल वृक्ष की सेवा कीजै ।\nशनिवार व्रत नियम से लीजै ॥', en: 'Pīpala vṛkṣa kī sevā kījai,\nŚanivāra vrata niyama se lījai.' },
        { dev: 'छायादान करो शनिवारा ।\nशनि देव होंवे सुखकारा ॥', en: 'Chhāyādāna karo Śanivārā,\nŚani Deva hoṁve sukhakārā.' },
        { dev: 'काले कपड़े उड़द दान दीजे ।\nशनि महाराज प्रसन्न हो लीजे ॥', en: 'Kāle kapaḍe uḍada dāna dīje,\nŚani Mahārāja prasanna ho līje.' },
        { dev: 'शनि चालीसा नित जो गावे ।\nकष्ट काटे सुख संपदा पावे ॥', en: 'Śani Chālīsā nita jo gāve,\nKaṣṭa kāṭe sukha sampadā pāve.' },
        { dev: 'जो कोई पढ़े शनि को ध्यावे ।\nमन वांछित फल अवश्य पावे ॥', en: 'Jo koī paḍhe Śani ko dhyāve,\nMana vāṁchhita phala avaśya pāve.' },
        { label: 'Doha', dev: 'शनि चालीसा पढ़ कर, ध्यान धरे जो कोय ।\nताको शनि देव सदा, मंगल करें न दोय ॥', en: 'Śani Chālīsā paḍha kara, dhyāna dhare jo koya,\nTāko Śani Deva sadā, maṅgala kareṁ na doya.' }
      ]
    },
    {
      id: 'shani-stotra',
      name: 'Shani Stotra',
      nameDev: 'शनि स्तोत्रम्',
      deity: 'shani',
      deityName: 'Lord Shani',
      deityDev: 'शनि',
      type: 'stotra',
      verses: [
        { dev: 'कोणस्थः पिंगलो बभ्रुः कृष्णो रौद्रोऽन्तको यमः ।\nसौरिः शनैश्चरो मन्दः पिप्पलादेन संस्तुतः ॥', en: 'Koṇasthaḥ piṅgalo babhruḥ Kṛṣṇo Raudro\'ntako Yamaḥ,\nSauriḥ Śanaiścharo Mandaḥ Pippalādena saṁstutaḥ.' },
        { dev: 'नमो नीलमयूखाय नीलोत्पलनिभाय च ।\nनमो निर्माँसदेहाय दीर्घश्मश्रुजटाय च ॥', en: 'Namo nīlamayūkhāya nīlotpala-nibhāya cha,\nNamo nirmāṁsadehāya dīrghaśmaśrujaṭāya cha.' },
        { dev: 'नमो विशालनेत्राय शुष्कोदरभयाकृते ।\nनमः पौरुषगात्राय स्थूलरोम्णे नमो नमः ॥', en: 'Namo viśālanetrāya śuṣkodarabhayākṛte,\nNamaḥ pauruṣagātrāya sthūlaromṇe namo namaḥ.' },
        { dev: 'नमो नित्यं क्षुधार्ताय चातकाय नमो नमः ।\nनमो दीर्घाय शुष्काय कालदंष्ट्र नमोऽस्तु ते ॥', en: 'Namo nityaṁ kṣudhārtāya chātakāya namo namaḥ,\nNamo dīrghāya śuṣkāya kāladaṁṣṭra namo\'stu te.' },
        { dev: 'नमस्ते कोटराक्षाय दुर्निरीक्ष्याय वै नमः ।\nनमो घोराय रौद्राय भीषणाय करालिने ॥', en: 'Namaste koṭarākṣāya durnirīkṣyāya vai namaḥ,\nNamo ghorāya raudrāya bhīṣaṇāya karāline.' },
        { dev: 'नमस्ते सर्वभक्षाय वलीमुख नमोऽस्तु ते ।\nसूर्यपुत्र नमस्तेऽस्तु भास्करे भयदाय च ॥', en: 'Namaste sarvabhakṣāya valīmukha namo\'stu te,\nSūryaputra namaste\'stu Bhāskare bhayadāya cha.' },
        { dev: 'अधोदृष्टे नमस्तेऽस्तु संवर्तक नमो नमः ।\nनमो मन्दगते तुभ्यं निस्त्रिंशाय नमो नमः ॥', en: 'Adhodṛṣṭe namaste\'stu Saṁvartaka namo namaḥ,\nNamo mandagate tubhyaṁ nistriṁśāya namo namaḥ.' },
        { dev: 'तपसा दग्धदेहाय नित्यं योगरताय च ।\nनमो नित्यं जपस्थाय शनैश्चराय वै नमः ॥', en: 'Tapasā dagdhadehāya nityaṁ yogaratāya cha,\nNamo nityaṁ japasthāya Śanaiścharāya vai namaḥ.' },
        { dev: 'प्रसादं मे सुरश्रेष्ठ दातुमर्हसि भास्कर ।\nदशरथो नाम राजा त्वां स्तौमि शनैश्चर ॥', en: 'Prasādaṁ me suraśreṣṭha dātumarhasi Bhāskara,\nDaśaratho nāma rājā tvāṁ staumi Śanaiśchara.' }
      ]
    },

    /* ==================================================================
       SURYA DEV
       ================================================================== */
    {
      id: 'aditya-hridayam',
      name: 'Aditya Hridayam',
      nameDev: 'आदित्य हृदयम्',
      deity: 'surya',
      deityName: 'Surya Dev',
      deityDev: 'सूर्य',
      type: 'stotra',
      verses: [
        { label: 'Verse 1', dev: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् ।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम् ॥', en: 'Tato yuddhapariśrāntaṁ samare chintayā sthitam,\nRāvaṇaṁ chāgrato dṛṣṭvā yuddhāya samupasthitam.' },
        { label: 'Verse 2', dev: 'दैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम् ।\nउपागम्याब्रवीद्राममगस्त्यो भगवानृषिः ॥', en: 'Daivataiścha samāgamya draṣṭumabhyāgato raṇam,\nUpāgamyābravīdrāmamagastyo bhagavānṛṣiḥ.' },
        { label: 'Verse 3', dev: 'राम राम महाबाहो शृणु गुह्यं सनातनम् ।\nयेन सर्वानरीन् वत्स समरे विजयिष्यसि ॥', en: 'Rāma Rāma mahābāho śṛṇu guhyaṁ sanātanam,\nYena sarvānarīn vatsa samare vijayiṣyasi.' },
        { label: 'Verse 4', dev: 'आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् ।\nजयावहं जपेन्नित्यमक्षय्यं परमं शिवम् ॥', en: 'Ādityahṛdayaṁ puṇyaṁ sarvaśatruvināśanam,\nJayāvahaṁ japennityamakṣayyaṁ paramaṁ śivam.' },
        { label: 'Verse 5', dev: 'सर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम् ।\nचिन्ताशोकप्रशमनमायुर्वर्धनमुत्तमम् ॥', en: 'Sarvamaṅgalamāṅgalyaṁ sarvapāpapraṇāśanam,\nChintāśokapraśamanamāyurvardhanamuttamam.' },
        { label: 'Verse 6', dev: 'रश्मिमन्तं समुद्यन्तं देवासुरनमस्कृतम् ।\nपूजयस्व विवस्वन्तं भास्करं भुवनेश्वरम् ॥', en: 'Raśmimantaṁ samudyantaṁ devāsuranamaskṛtam,\nPūjayasva Vivasvantaṁ Bhāskaraṁ Bhuvaneśvaram.' },
        { label: 'Verse 7', dev: 'सर्वदेवात्मको ह्येष तेजस्वी रश्मिभावनः ।\nएष देवासुरगणाँल्लोकान् पाति गभस्तिभिः ॥', en: 'Sarvadevātmako hyeṣa tejasvī raśmibhāvanaḥ,\nEṣa devāsuragaṇāṁllokān pāti gabhastibhiḥ.' },
        { label: 'Verse 8', dev: 'एष ब्रह्मा च विष्णुश्च शिवः स्कन्दः प्रजापतिः ।\nमहेन्द्रो धनदः कालो यमः सोमो ह्यपां पतिः ॥', en: 'Eṣa Brahmā cha Viṣṇuścha Śivaḥ Skandaḥ Prajāpatiḥ,\nMahendro Dhanadaḥ Kālo Yamaḥ Somo hyapāṁ patiḥ.' },
        { label: 'Verse 9', dev: 'पितरो वसवः साध्या ह्यश्विनौ मरुतो मनुः ।\nवायुर्वह्निः प्रजाप्राण ऋतुकर्ता प्रभाकरः ॥', en: 'Pitaro Vasavaḥ Sādhyā hyAśvinau Maruto Manuḥ,\nVāyurvahniḥ prajāprāṇa ṛtukartā Prabhākaraḥ.' },
        { label: 'Verse 10', dev: 'आदित्यः सविता सूर्यः खगः पूषा गभस्तिमान् ।\nसुवर्णसदृशो भानुर्हिरण्यरेता दिवाकरः ॥', en: 'Ādityaḥ Savitā Sūryaḥ Khagaḥ Pūṣā Gabhastimān,\nSuvarṇasadṛśo Bhānurhiraṇyaretā Divākaraḥ.' },
        { label: 'Verse 11', dev: 'हरिदश्वः सहस्रार्चिः सप्तसप्तिर्मरीचिमान् ।\nतिमिरोन्मथनः शम्भुस्त्वष्टा मार्ताण्ड अंशुमान् ॥', en: 'Haridaśvaḥ sahasrārchiḥ saptasaptirmarīchimān,\nTimironmathanaḥ Śambhustvaṣṭā Mārtāṇḍa aṁśumān.' },
        { label: 'Verse 12', dev: 'हिरण्यगर्भः शिशिरस्तपनो भास्करो रविः ।\nअग्निगर्भोऽदितेः पुत्रः शंखः शिशिरनाशनः ॥', en: 'Hiraṇyagarbhaḥ śiśirastapano Bhāskaro Raviḥ,\nAgnigarbho\'diteḥ putraḥ Śaṅkhaḥ śiśiranāśanaḥ.' },
        { label: 'Verse 13', dev: 'व्योमनाथस्तमोभेदी ऋग्यजुःसामपारगः ।\nघनवृष्टिरपां मित्रो विन्ध्यवीथीप्लवङ्गमः ॥', en: 'Vyomanāthastamobhedī ṛgyajuḥsāmapāragaḥ,\nGhanavṛṣṭirapāṁ mitro Vindhyavīthīplavaṅgamaḥ.' },
        { label: 'Verse 14', dev: 'आतपी मण्डली मृत्युः पिङ्गलः सर्वतापनः ।\nकविर्विश्वो महातेजाः रक्तः सर्वभवोद्भवः ॥', en: 'Ātapī maṇḍalī mṛtyuḥ piṅgalaḥ sarvatāpanaḥ,\nKavirviśvo mahātejāḥ raktaḥ sarvabhavodbhavaḥ.' },
        { label: 'Verse 15', dev: 'नक्षत्रग्रहताराणामधिपो विश्वभावनः ।\nतेजसामपि तेजस्वी द्वादशात्मन् नमोऽस्तु ते ॥', en: 'Nakṣatragrahatārāṇāmadhipo viśvabhāvanaḥ,\nTejasāmapi tejasvī dvādaśātman namo\'stu te.' },
        { label: 'Verse 16', dev: 'नमः पूर्वाय गिरये पश्चिमायाद्रये नमः ।\nज्योतिर्गणानां पतये दिनाधिपतये नमः ॥', en: 'Namaḥ pūrvāya giraye paśchimāyādraye namaḥ,\nJyotirgaṇānāṁ pataye dinādhipataye namaḥ.' },
        { label: 'Verse 17', dev: 'जयाय जयभद्राय हर्यश्वाय नमो नमः ।\nनमो नमः सहस्रांशो आदित्याय नमो नमः ॥', en: 'Jayāya jayabhadrāya haryaśvāya namo namaḥ,\nNamo namaḥ sahasrāṁśo Ādityāya namo namaḥ.' },
        { label: 'Verse 18', dev: 'नम उग्राय वीराय सारङ्गाय नमो नमः ।\nनमः पद्मप्रबोधाय मार्ताण्डाय नमो नमः ॥', en: 'Nama ugrāya vīrāya sāraṅgāya namo namaḥ,\nNamaḥ padmaprabodhāya Mārtāṇḍāya namo namaḥ.' },
        { label: 'Verse 19', dev: 'ब्रह्मेशानाच्युतेशाय सूर्यायादित्यवर्चसे ।\nभास्वते सर्वभक्षाय रौद्राय वपुषे नमः ॥', en: 'Brahmeśānāchyuteśāya Sūryāyādityavarchase,\nBhāsvate sarvabhakṣāya Raudrāya vapuṣe namaḥ.' },
        { label: 'Verse 20', dev: 'तमोघ्नाय हिमघ्नाय शत्रुघ्नायामितात्मने ।\nकृतघ्नघ्नाय देवाय ज्योतिषां पतये नमः ॥', en: 'Tamoghāya himaghāya śatrughnāyāmitātmane,\nKṛtaghnaghāya devāya jyotiṣāṁ pataye namaḥ.' },
        { label: 'Verse 21', dev: 'तप्तचामीकराभाय वह्नये विश्वकर्मणे ।\nनमस्तमोऽभिनिघ्नाय रुचये लोकसाक्षिणे ॥', en: 'Taptachāmīkarābhāya vahnaye viśvakarmṇe,\nNamastamo\'bhiniganāya ruchaye lokasākṣiṇe.' },
        { label: 'Verse 22', dev: 'नाशयत्येष वै भूतं तदेव सृजति प्रभुः ।\nपायत्येष तपत्येष वर्षत्येष गभस्तिभिः ॥', en: 'Nāśayatyeṣa vai bhūtaṁ tadeva sṛjati Prabhuḥ,\nPāyatyeṣa tapatyeṣa varṣatyeṣa gabhastibhiḥ.' },
        { label: 'Verse 23', dev: 'एष सुप्तेषु जागर्ति भूतेषु परिनिष्ठितः ।\nएष एवाग्निहोत्रं च फलं चैवाग्निहोत्रिणाम् ॥', en: 'Eṣa supteṣu jāgarti bhūteṣu pariniṣṭhitaḥ,\nEṣa evāgnihotraṁ cha phalaṁ chaivāgnihotriṇām.' },
        { label: 'Verse 24', dev: 'वेदाश्च क्रतवश्चैव क्रतूनां फलमेव च ।\nयानि कृत्यानि लोकेषु सर्व एष रविः प्रभुः ॥', en: 'Vedāścha kratavaśchaiva kratūnāṁ phalameva cha,\nYāni kṛtyāni lokeṣu sarva eṣa Raviḥ Prabhuḥ.' },
        { label: 'Verse 25', dev: 'एनमापत्सु कृच्छ्रेषु कान्तारेषु भयेषु च ।\nकीर्तयन् पुरुषः कश्चिन्नावसीदति राघव ॥', en: 'Enamāpatsu kṛchchhreṣu kāntāreṣu bhayeṣu cha,\nKīrtayan puruṣaḥ kaśchinnāvasīdati Rāghava.' },
        { label: 'Verse 26', dev: 'पूजयस्वैनमेकाग्रो देवदेवं जगत्पतिम् ।\nएतत् त्रिगुणितं जप्त्वा युद्धेषु विजयिष्यसि ॥', en: 'Pūjayasvainamekāgro devadevaṁ jagatpatim,\nEtat triguṇitaṁ japtvā yuddheṣu vijayiṣyasi.' },
        { label: 'Verse 27', dev: 'अस्मिन् क्षणे महाबाहो रावणं त्वं वधिष्यसि ।\nएवमुक्त्वा तदागस्त्यो जगाम च यथागतम् ॥', en: 'Asmin kṣaṇe mahābāho Rāvaṇaṁ tvaṁ vadhiṣyasi,\nEvamuktvā tadāgastyo jagāma cha yathāgatam.' },
        { label: 'Verse 28', dev: 'एतच्छ्रुत्वा महातेजा नष्टशोकोऽभवत्तदा ।\nधारयामास सुप्रीतो राघवः प्रयतात्मवान् ॥', en: 'Etachchhrutvā mahātejā naṣṭaśoko\'bhavattadā,\nDhārayāmāsa suprīto Rāghavaḥ prayatātmavān.' },
        { label: 'Verse 29', dev: 'आदित्यं प्रेक्ष्य जप्त्वा तु परं हर्षमवाप्तवान् ।\nत्रिराचम्य शुचिर्भूत्वा धनुरादाय वीर्यवान् ॥', en: 'Ādityaṁ prekṣya japtvā tu paraṁ harṣamavāptavān,\nTrirāchamya śuchirbhūtvā dhanurādāya vīryavān.' },
        { label: 'Verse 30', dev: 'रावणं प्रेक्ष्य हृष्टात्मा युद्धाय समुपागमत् ।\nसर्वयत्नेन महता वधे तस्य धृतोऽभवत् ॥', en: 'Rāvaṇaṁ prekṣya hṛṣṭātmā yuddhāya samupāgamat,\nSarvayatnena mahatā vadhe tasya dhṛto\'bhavat.' },
        { label: 'Verse 31', dev: 'अथ रविरवदन्निरीक्ष्य रामं मुदितमनाः परमं प्रहृष्यमाणः ।\nनिशिचरपतिसंक्षयं विदित्वा सुरगणमध्यगतो वचस्त्वरेति ॥', en: 'Atha raviravadannirīkṣya Rāmaṁ muditamanāḥ paramaṁ prahṛṣyamāṇaḥ,\nNiśicharapatisaṁkṣayaṁ viditvā suragaṇamadhyagato vachastvareti.' }
      ]
    },
    {
      id: 'surya-chalisa',
      name: 'Surya Chalisa',
      nameDev: 'सूर्य चालीसा',
      deity: 'surya',
      deityName: 'Surya Dev',
      deityDev: 'सूर्य',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'कनक बदन कुण्डल मकर, मुकुट शीश पर राज ।\nसूर्य देव की आरती, करिये सब मिल साज ॥', en: 'Kanaka badana kuṇḍala makara, mukuṭa śīśa para rāja,\nSūrya Deva kī āratī, kariye saba mili sāja.' },
        { label: 'Chaupai', dev: 'जय सूर्य देव दयानिधान ।\nजय जग तिमिर निवारण भान ॥', en: 'Jaya Sūrya Deva dayānidhāna,\nJaya jaga timira nivāraṇa bhāna.' },
        { dev: 'जय जय रवि जय दिनकर स्वामी ।\nजय जय सूर्य अन्तर्यामी ॥', en: 'Jaya jaya Ravi jaya Dinakara Svāmī,\nJaya jaya Sūrya Antaryāmī.' },
        { dev: 'कश्यप ऋषि अदिति के प्यारे ।\nतिमिर नशावन किरण तुम्हारे ॥', en: 'Kaśyapa ṛṣi Aditi ke pyāre,\nTimira naśāvana kiraṇa tumhāre.' },
        { dev: 'सप्ताश्व रथ पर हो सवारी ।\nसारथी अरुण गति अति न्यारी ॥', en: 'Saptāśva ratha para ho savārī,\nSārathī Aruṇa gati ati nyārī.' },
        { dev: 'तुम्हें ग्रहों में उत्तम जाना ।\nतुम बिन जीवन अंध समाना ॥', en: 'Tumheṁ grahoṁ meṁ uttama jānā,\nTuma bina jīvana andha samānā.' },
        { dev: 'द्वादश मास तुम कारण होते ।\nऋतु वर्षा शीत ग्रीष्म बहे ॥', en: 'Dvādaśa māsa tuma kāraṇa hote,\nṚtu varṣā śīta grīṣma bahe.' },
        { dev: 'सारी सृष्टि तुम ही से चाली ।\nप्राणप्रद तुम्हीं जगत रखवाली ॥', en: 'Sārī sṛṣṭi tuma hī se chālī,\nPrāṇaprada tumhīṁ jagata rakhavālī.' },
        { dev: 'कुष्ठ रोग हर सकल संतापा ।\nरवि सेवत नर मिटत पापा ॥', en: 'Kuṣṭha roga hara sakala santāpā,\nRavi sevata nara miṭata pāpā.' },
        { dev: 'सूर्यनारायण तुम प्रभु दाता ।\nसब जग पालनहार विधाता ॥', en: 'Sūryanārāyaṇa tuma Prabhu dātā,\nSaba jaga pālanahāra vidhātā.' },
        { dev: 'कनकभान प्रभु तुम बलवाना ।\nतव किरणें जग मंगल जाना ॥', en: 'Kanakabhāna Prabhu tuma balavānā,\nTava kiraṇeṁ jaga maṅgala jānā.' },
        { dev: 'ब्रह्मा विष्णु शिव तव गुण गावें ।\nवेद पुराण तुम्हारी यश छावें ॥', en: 'Brahmā Viṣṇu Śiva tava guṇa gāveṁ,\nVeda Purāṇa tumhārī yaśa chhāveṁ.' },
        { dev: 'कोणस्थ कुम्भ पर दृष्टि जो डारो ।\nमान सम्मान बढ़ावो सारो ॥', en: 'Koṇastha kumbha para dṛṣṭi jo ḍāro,\nMāna sammāna baḍhāvo sāro.' },
        { dev: 'तुम्हरे तेज से जग प्रकाशे ।\nअंधकार सब दूर विनाशे ॥', en: 'Tumhare teja se jaga prakāśe,\nAndhakāra saba dūra vināśe.' },
        { dev: 'रविवार व्रत जो नर कीजै ।\nताको सूर्य सदा सुख दीजै ॥', en: 'Ravivāra vrata jo nara kījai,\nTāko Sūrya sadā sukha dījai.' },
        { dev: 'गुड़ गेहूँ दान जो शनिवारा ।\nशनि पीड़ा हर सूर्य पुकारा ॥', en: 'Guḍa gehūṁ dāna jo Śanivārā,\nŚani pīḍā hara Sūrya pukārā.' },
        { dev: 'सूर्य चालीसा जो नर गावे ।\nसब सुख भोग मोक्ष पद पावे ॥', en: 'Sūrya Chālīsā jo nara gāve,\nSaba sukha bhoga mokṣa pada pāve.' },
        { label: 'Doha', dev: 'सूर्य चालीसा प्रेम से, पढ़े जो नर और नार ।\nकोटि जनम का पाप कट, हो सूर्य का प्यार ॥', en: 'Sūrya Chālīsā prema se, paḍhe jo nara aura nāra,\nKoṭi janama kā pāpa kaṭa, ho Sūrya kā pyāra.' }
      ]
    },

    /* ==================================================================
       GODDESS TULSI
       ================================================================== */
    {
      id: 'tulsi-chalisa',
      name: 'Tulsi Chalisa',
      nameDev: 'तुलसी चालीसा',
      deity: 'tulsi',
      deityName: 'Goddess Tulsi',
      deityDev: 'तुलसी',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'श्री तुलसी महारानी, नमो नमो नमो नमः ।\nहरि के प्रिय है तुलसी, सुख सम्पत्ति करो सदा अमः ॥', en: 'Śrī Tulasī Mahārānī, namo namo namo namaḥ,\nHari ke priya hai Tulasī, sukha sampatti karo sadā amaḥ.' },
        { label: 'Chaupai', dev: 'तुलसी महिमा कहत न आवै ।\nतुलसी में हरि बसत सुहावै ॥', en: 'Tulasī mahimā kahata na āvai,\nTulasī meṁ Hari basata suhāvai.' },
        { dev: 'विष्णुप्रिया तुलसी रानी ।\nभक्तन में बहु पुण्य निशानी ॥', en: 'Viṣṇupriyā Tulasī rānī,\nBhaktana meṁ bahu puṇya niśānī.' },
        { dev: 'देवलोक सब तुलसी पूजें ।\nतुलसी बिना पूजा नहिं सूझें ॥', en: 'Devaloka saba Tulasī pūjeṁ,\nTulasī binā pūjā nahiṁ sūjheṁ.' },
        { dev: 'तुलसी विष्णु मंदिर सोहे ।\nजहाँ तुलसी तहाँ हरि मोहे ॥', en: 'Tulasī Viṣṇu mandira sohe,\nJahāṁ Tulasī tahāṁ Hari mohe.' },
        { dev: 'नित्य तुलसी की सेवा कीजै ।\nघर आँगन में तुलसी बीजै ॥', en: 'Nitya Tulasī kī sevā kījai,\nGhara āṁgana meṁ Tulasī bījai.' },
        { dev: 'पापहारिणी पुण्यदायिनी ।\nरोग नाशिनी सुख प्रदायिनी ॥', en: 'Pāpahāriṇī puṇyadāyinī,\nRoga nāśinī sukha pradāyinī.' },
        { dev: 'तुलसी दल जो नित हरि चढ़ावे ।\nलक्ष्मी नारायण प्रसन्न पावे ॥', en: 'Tulasī dala jo nita Hari chaḍhāve,\nLakṣmī Nārāyaṇa prasanna pāve.' },
        { dev: 'तुलसी माला कण्ठ में धारो ।\nयम दूतन को दूर निवारो ॥', en: 'Tulasī mālā kaṇṭha meṁ dhāro,\nYama dūtana ko dūra nivāro.' },
        { dev: 'कार्तिक मास तुलसी विवाहा ।\nविष्णु संग मिलन बड़ी चाहा ॥', en: 'Kārtika māsa Tulasī vivāhā,\nViṣṇu saṅga milana baḍī chāhā.' },
        { dev: 'वृन्दावन में तुम सदा विराजो ।\nभक्तन के हृदय में सदा बिराजो ॥', en: 'Vṛndāvana meṁ tuma sadā virājo,\nBhaktana ke hṛdaya meṁ sadā birājo.' },
        { dev: 'सकल देव तुम को शीश नवावें ।\nमन क्रम बचन तुलसी गुण गावें ॥', en: 'Sakala deva tuma ko śīśa navāveṁ,\nMana krama bachana Tulasī guṇa gāveṁ.' },
        { dev: 'जल अर्पण तुलसी को नीके ।\nसंध्या दीप जलत अति ठीके ॥', en: 'Jala arpaṇa Tulasī ko nīke,\nSandhyā dīpa jalata ati ṭhīke.' },
        { dev: 'तुलसी चालीसा जो गावे ।\nविष्णु भगवान की कृपा पावे ॥', en: 'Tulasī Chālīsā jo gāve,\nViṣṇu Bhagavāna kī kṛpā pāve.' },
        { label: 'Doha', dev: 'तुलसी चालीसा पढ़ें, प्रेमभाव धर ध्यान ।\nघर में सुख शांति बसे, मिले मोक्ष कल्याण ॥', en: 'Tulasī Chālīsā paḍheṁ, premabhāva dhara dhyāna,\nGhara meṁ sukha śānti base, mile mokṣa kalyāṇa.' }
      ]
    },
    {
      id: 'tulsi-stotram',
      name: 'Tulsi Stotram',
      nameDev: 'तुलसी स्तोत्रम्',
      deity: 'tulsi',
      deityName: 'Goddess Tulsi',
      deityDev: 'तुलसी',
      type: 'stotra',
      verses: [
        { dev: 'जगद्धात्रि नमस्तुभ्यं विष्णोश्च प्रियवल्लभे ।\nयतो ब्रह्मादयो देवाः सृष्टिस्थित्यन्तकारिणः ॥', en: 'Jagaddhātri namastubhyaṁ Viṣṇoścha priyavallabhe,\nYato Brahmādayo devāḥ sṛṣṭisthityantakāriṇaḥ.' },
        { dev: 'नमस्तुलसि कल्याणि नमो विष्णुप्रिये शुभे ।\nनमो मोक्षप्रदे देवि नमः सम्पत्प्रदायिनि ॥', en: 'Namastulasi kalyāṇi namo Viṣṇupriye śubhe,\nNamo mokṣaprade Devi namaḥ sampatpradāyini.' },
        { dev: 'तुलसी श्रीसखी शुभे पापहारिणि पुण्यदे ।\nनमस्ते नारदनुते नारायणमनःप्रिये ॥', en: 'Tulasī Śrīsakhī śubhe pāpahāriṇi puṇyade,\nNamaste Nāradanute Nārāyaṇamanaḥpriye.' },
        { dev: 'तुलस्यमृतजन्मासि सदा त्वं केशवप्रिये ।\nकेशवार्थे चिनोमि त्वां वरदा भव शोभने ॥', en: 'Tulasyamṛtajanmāsi sadā tvaṁ Keśavapriye,\nKeśavārthe chinomi tvāṁ varadā bhava śobhane.' },
        { dev: 'त्वदंगसम्भवैर्नित्यं पूजयामि यथा हरिम् ।\nतथा कुरु पवित्रांगि कलौ मलविनाशिनि ॥', en: 'Tvadaṅgasambhavairnityaṁ pūjayāmi yathā Harim,\nTathā kuru pavitrāṅgi kalau malavināśini.' }
      ]
    }
  ];

  /* ---- Deity metadata for library page ------------------------------- */
  var DEITIES = [
    { id: 'hanuman', name: 'Hanuman', dev: 'हनुमान', icon: 'ॐ', color: '#c86e30' },
    { id: 'shiva', name: 'Lord Shiva', dev: 'शिव', icon: 'ॐ', color: '#5a7aa0' },
    { id: 'vishnu', name: 'Lord Vishnu', dev: 'विष्णु', icon: 'ॐ', color: '#2e6b8a' },
    { id: 'krishna', name: 'Lord Krishna', dev: 'कृष्ण', icon: 'ॐ', color: '#2b5a9e' },
    { id: 'rama', name: 'Lord Rama', dev: 'राम', icon: 'ॐ', color: '#8b6914' },
    { id: 'ganesha', name: 'Lord Ganesha', dev: 'गणेश', icon: 'ॐ', color: '#d4782f' },
    { id: 'durga', name: 'Goddess Durga', dev: 'दुर्गा', icon: 'ॐ', color: '#b33d3d' },
    { id: 'lakshmi', name: 'Goddess Lakshmi', dev: 'लक्ष्मी', icon: 'ॐ', color: '#b5852f' },
    { id: 'saraswati', name: 'Goddess Saraswati', dev: 'सरस्वती', icon: 'ॐ', color: '#e8e8e8' },
    { id: 'kali', name: 'Goddess Kali', dev: 'काली', icon: 'ॐ', color: '#3d3d5c' },
    { id: 'shani', name: 'Lord Shani', dev: 'शनि', icon: 'ॐ', color: '#2d2d3d' },
    { id: 'surya', name: 'Surya Dev', dev: 'सूर्य', icon: 'ॐ', color: '#d4a017' },
    { id: 'tulsi', name: 'Goddess Tulsi', dev: 'तुलसी', icon: 'ॐ', color: '#2e8b57' }
  ];

  global.NAAM_JAP_STOTRAS = STOTRAS;
  global.NAAM_JAP_DEITIES = DEITIES;

})(typeof window !== 'undefined' ? window : this);
