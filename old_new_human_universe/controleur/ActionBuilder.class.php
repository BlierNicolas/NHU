<?php
class ActionBuilder{
	public static function getAction($nomAction){
		if (!ISSET($_SESSION)) session_start();
		switch ($nomAction) {
			//Pages principales
			case "main":
				$_SESSION["nhu"]["main"] = "main";
				return "main";
			case "listePersonnages":
				$_SESSION["nhu"]["main"] = "listePersonnages";
				return "listePersonnages";
			case "listeGroupes":
				$_SESSION["nhu"]["main"] = "listeGroupes";
				return "listeGroupes";
			case "listeLieux":
				$_SESSION["nhu"]["main"] = "listeLieux";
				return "listeLieux";
			case "listePouvoirs":
				$_SESSION["nhu"]["main"] = "listePouvoirs";
				return "listePouvoirs";
			case "listeHistoires":
				$_SESSION["nhu"]["main"] = "listeHistoires";
				return "listeHistoires";
			case "calendrier":
				$_SESSION["nhu"]["main"] = "calendrier";
				return "calendrier";
			case "planSite":
				$_SESSION["nhu"]["main"] = "planSite";
				return "planSite";
				
			//Personnages
			case "albert_lambert":
				$_SESSION["nhu"]["main"] = "personnage_albert_lambert";
				return "personnage_albert_lambert";
			case "alexis_bunakod":
				$_SESSION["nhu"]["main"] = "personnage_alexis_bunakod";
				return "personnage_alexis_bunakod";
			case "alexis_tran":
				$_SESSION["nhu"]["main"] = "personnage_alexis_tran";
				return "personnage_alexis_tran";
			case "alicia_natir":
				$_SESSION["nhu"]["main"] = "personnage_alicia_natir";
				return "personnage_alicia_natir";
			case "angelique_ramber":
				$_SESSION["nhu"]["main"] = "personnage_angelique_ramber";
				return "personnage_angelique_ramber";
			case "bailey_thotokan":
				$_SESSION["nhu"]["main"] = "personnage_bailey_thotokan";
				return "personnage_bailey_thotokan";
			case "billy_diaz":
				$_SESSION["nhu"]["main"] = "personnage_billy_diaz";
				return "personnage_billy_diaz";
			case "brett_walker":
				$_SESSION["nhu"]["main"] = "personnage_brett_walker";
				return "personnage_brett_walker";
			case "bruno_maes":
				$_SESSION["nhu"]["main"] = "personnage_bruno_maes";
				return "personnage_bruno_maes";
			case "carlos_hennors":
				$_SESSION["nhu"]["main"] = "personnage_carlos_hennors";
				return "personnage_carlos_hennors";
			case "cedric_moss":
				$_SESSION["nhu"]["main"] = "personnage_cedric_moss";
				return "personnage_cedric_moss";
			case "celia_morris":
				$_SESSION["nhu"]["main"] = "personnage_celia_morris";
				return "personnage_celia_morris";
			case "chelsea_mack":
				$_SESSION["nhu"]["main"] = "personnage_chelsea_mack";
				return "personnage_chelsea_mack";
			case "clara_nairo":
				$_SESSION["nhu"]["main"] = "personnage_clara_nairo";
				return "personnage_clara_nairo";
			case "darakei_drumel":
				$_SESSION["nhu"]["main"] = "personnage_darakei_drumel";
				return "personnage_darakei_drumel";
			case "daryl_koido":
				$_SESSION["nhu"]["main"] = "personnage_daryl_koido";
				return "personnage_daryl_koido";
			case "debbie_ball":
				$_SESSION["nhu"]["main"] = "personnage_debbie_ball";
				return "personnage_debbie_ball";
			case "diakell_drumel":
				$_SESSION["nhu"]["main"] = "personnage_diakell_drumel";
				return "personnage_diakell_drumel";
			case "drake_tarcion":
				$_SESSION["nhu"]["main"] = "personnage_drake_tarcion";
				return "personnage_drake_tarcion";
			case "elea_drumel":
				$_SESSION["nhu"]["main"] = "personnage_elea_drumel";
				return "personnage_elea_drumel";
			case "ethan_drumel":
				$_SESSION["nhu"]["main"] = "personnage_ethan_drumel";
				return "personnage_ethan_drumel";
			case "evie_drumel":
				$_SESSION["nhu"]["main"] = "personnage_evie_drumel";
				return "personnage_evie_drumel";
			case "ezekiel_huyme":
				$_SESSION["nhu"]["main"] = "personnage_ezekiel_huyme";
				return "personnage_ezekiel_huyme";
			case "felix_hybrascus":
				$_SESSION["nhu"]["main"] = "personnage_felix_hybrascus";
				return "personnage_felix_hybrascus";
			case "flynn_gamay":
				$_SESSION["nhu"]["main"] = "personnage_flynn_gamay";
				return "personnage_flynn_gamay";
			case "gabriel_daurikir":
				$_SESSION["nhu"]["main"] = "personnage_gabriel_daurikir";
				return "personnage_gabriel_daurikir";
			case "gaelle_fanelly":
				$_SESSION["nhu"]["main"] = "personnage_gaelle_fanelly";
				return "personnage_gaelle_fanelly";
			case "gaia_dodirin":
				$_SESSION["nhu"]["main"] = "personnage_gaia_dodirin";
				return "personnage_gaia_dodirin";
			case "gwen_zalvard":
				$_SESSION["nhu"]["main"] = "personnage_gwen_zalvard";
				return "personnage_gwen_zalvard";
			case "hiro_zapur":
				$_SESSION["nhu"]["main"] = "personnage_hiro_zapur";
				return "personnage_hiro_zapur";
			case "hug_arur":
				$_SESSION["nhu"]["main"] = "personnage_hug_arur";
				return "personnage_hug_arur";
			case "isao_gircas":
				$_SESSION["nhu"]["main"] = "personnage_isao_gircas";
				return "personnage_isao_gircas";
			case "jack_amidus":
				$_SESSION["nhu"]["main"] = "personnage_jack_amidus";
				return "personnage_jack_amidus";
			case "jake_roberson":
				$_SESSION["nhu"]["main"] = "personnage_jake_roberson";
				return "personnage_jake_roberson";
			case "jennifer_bowen":
				$_SESSION["nhu"]["main"] = "personnage_jennifer_bowen";
				return "personnage_jennifer_bowen";
			case "jon_drabod":
				$_SESSION["nhu"]["main"] = "personnage_jon_drabod";
				return "personnage_jon_drabod";
			case "julius_anderson":
				$_SESSION["nhu"]["main"] = "personnage_julius_anderson";
				return "personnage_julius_anderson";
			case "kameron_daunasod":
				$_SESSION["nhu"]["main"] = "personnage_kameron_daunasod";
				return "personnage_kameron_daunasod";
			case "kaya_serembion":
				$_SESSION["nhu"]["main"] = "personnage_kaya_serembion";
				return "personnage_kaya_serembion";
			case "kellan_brogran":
				$_SESSION["nhu"]["main"] = "personnage_kellan_brogran";
				return "personnage_kellan_brogran";
			case "kemyanne_hitaram":
				$_SESSION["nhu"]["main"] = "personnage_kemyanne_hitaram";
				return "personnage_kemyanne_hitaram";
			case "kyna_gamay":
				$_SESSION["nhu"]["main"] = "personnage_kyna_gamay";
				return "personnage_kyna_gamay";
			case "lina_brapus":
				$_SESSION["nhu"]["main"] = "personnage_lina_brapus";
				return "personnage_lina_brapus";
			case "louann_koris":
				$_SESSION["nhu"]["main"] = "personnage_louann_koris";
				return "personnage_louann_koris";
			case "luke_gonzalez":
				$_SESSION["nhu"]["main"] = "personnage_luke_gonzalez";
				return "personnage_luke_gonzalez";
			case "lyliane_drumel":
				$_SESSION["nhu"]["main"] = "personnage_lyliane_drumel";
				return "personnage_lyliane_drumel";
			case "madame_carfiss":
				$_SESSION["nhu"]["main"] = "personnage_madame_carfiss";
				return "personnage_madame_carfiss";
			case "madame_collins":
				$_SESSION["nhu"]["main"] = "personnage_madame_collins";
				return "personnage_madame_collins";
			case "madame_hampton":
				$_SESSION["nhu"]["main"] = "personnage_madame_hampton";
				return "personnage_madame_hampton";
			case "marie_dithos":
				$_SESSION["nhu"]["main"] = "personnage_marie_dithos";
				return "personnage_marie_dithos";
			case "mickael_stephan":
				$_SESSION["nhu"]["main"] = "personnage_mickael_stephan";
				return "personnage_mickael_stephan";
			case "monsieur_hikino":
				$_SESSION["nhu"]["main"] = "personnage_monsieur_hikino";
				return "personnage_monsieur_hikino";
			case "monsieur_johnson":
				$_SESSION["nhu"]["main"] = "personnage_monsieur_johnson";
				return "personnage_monsieur_johnson";
			case "ray_vazot":
				$_SESSION["nhu"]["main"] = "personnage_ray_vazot";
				return "personnage_ray_vazot";
			case "rebecca_huff":
				$_SESSION["nhu"]["main"] = "personnage_rebecca_huff";
				return "personnage_rebecca_huff";
			case "renji_prepas":
				$_SESSION["nhu"]["main"] = "personnage_renji_prepas";
				return "personnage_renji_prepas";
			case "russell_gordon":
				$_SESSION["nhu"]["main"] = "personnage_russell_gordon";
				return "personnage_russell_gordon";
			case "saeko_black":
				$_SESSION["nhu"]["main"] = "personnage_saeko_black";
				return "personnage_saeko_black";
			case "sam_mithus":
				$_SESSION["nhu"]["main"] = "personnage_sam_mithus";
				return "personnage_sam_mithus";
			case "sandrine_lirtan":
				$_SESSION["nhu"]["main"] = "personnage_sandrine_lirtan";
				return "personnage_sandrine_lirtan";
			case "sarah_lirtan":
				$_SESSION["nhu"]["main"] = "personnage_sarah_lirtan";
				return "personnage_sarah_lirtan";
			case "sebastien_dalam":
				$_SESSION["nhu"]["main"] = "personnage_sebastien_dalam";
				return "personnage_sebastien_dalam";
			case "shelley_moran":
				$_SESSION["nhu"]["main"] = "personnage_shelley_moran";
				return "personnage_shelley_moran";
			case "steeve_brapus":
				$_SESSION["nhu"]["main"] = "personnage_steeve_brapus";
				return "personnage_steeve_brapus";
			case "suna_gidirel":
				$_SESSION["nhu"]["main"] = "personnage_suna_gidirel";
				return "personnage_suna_gidirel";
			case "teri_patterson":
				$_SESSION["nhu"]["main"] = "personnage_teri_patterson";
				return "personnage_teri_patterson";
			case "thalie_tullan":
				$_SESSION["nhu"]["main"] = "personnage_thalie_tullan";
				return "personnage_thalie_tullan";
			case "theo_magodil":
				$_SESSION["nhu"]["main"] = "personnage_theo_magodil";
				return "personnage_theo_magodil";
			case "thomas_unif":
				$_SESSION["nhu"]["main"] = "personnage_thomas_unif";
				return "personnage_thomas_unif";
			case "tiana_gresas":
				$_SESSION["nhu"]["main"] = "personnage_tiana_gresas";
				return "personnage_tiana_gresas";
			case "tim_allam":
				$_SESSION["nhu"]["main"] = "personnage_tim_allam";
				return "personnage_tim_allam";
			case "todd_brapus":
				$_SESSION["nhu"]["main"] = "personnage_todd_brapus";
				return "personnage_todd_brapus";
			case "tom_tralvan":
				$_SESSION["nhu"]["main"] = "personnage_tom_tralvan";
				return "personnage_tom_tralvan";
			case "vincent_ortiz":
				$_SESSION["nhu"]["main"] = "personnage_vincent_ortiz";
				return "personnage_vincent_ortiz";
			case "wamien_mata":
				$_SESSION["nhu"]["main"] = "personnage_wamien_mata";
				return "personnage_wamien_mata";
			case "william_drumel":
				$_SESSION["nhu"]["main"] = "personnage_william_drumel";
				return "personnage_william_drumel";
			case "yoona_brapus":
				$_SESSION["nhu"]["main"] = "personnage_yoona_brapus";
				return "personnage_yoona_brapus";
			case "yuu_gamay":
				$_SESSION["nhu"]["main"] = "personnage_yuu_gamay";
				return "personnage_yuu_gamay";
			
			//Pouvoirs
			case "pouvoirAdaptation":
				$_SESSION["nhu"]["main"] = "pouvoir_adaptation";
				return "pouvoir_adaptation";
			case "pouvoirCapaciteReptilienne":
				$_SESSION["nhu"]["main"] = "pouvoir_capacites_reptiliennes";
				return "pouvoir_capacites_reptiliennes";
			case "pouvoirClonage":
				$_SESSION["nhu"]["main"] = "pouvoir_clonage";
				return "pouvoir_clonage";
			case "pouvoirControleAutre":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_autres";
				return "pouvoir_controle_autres";
			case "pouvoirControleEau":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_eau";
				return "pouvoir_controle_eau";
			case "pouvoirControleFeu":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_feu";
				return "pouvoir_controle_feu";
			case "pouvoirControleGlace":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_glace";
				return "pouvoir_controle_glace";
			case "pouvoirControleGravite":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_gravite";
				return "pouvoir_controle_gravite";
			case "pouvoirControleHumeur":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_humeur";
				return "pouvoir_controle_humeur";
			case "pouvoirControleLumiere":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_lumiere";
				return "pouvoir_controle_lumiere";
			case "pouvoirControleMetal":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_metal";
				return "pouvoir_controle_metal";
			case "pouvoirControleOmbre":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_ombres";
				return "pouvoir_controle_ombres";
			case "pouvoirControlePlante":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_plante";
				return "pouvoir_controle_plante";
			case "pouvoirControleTechnologies":
				$_SESSION["nhu"]["main"] = "pouvoir_controle_technologies";
				return "pouvoir_controle_technologies";
			case "pouvoirDetectionMensonge":
				$_SESSION["nhu"]["main"] = "pouvoir_detection_mensonge";
				return "pouvoir_detection_mensonge";
			case "pouvoirDetectionPouvoir":
				$_SESSION["nhu"]["main"] = "pouvoir_detection_pouvoir";
				return "pouvoir_detection_pouvoir";
			case "pouvoirDuplicationObjet":
				$_SESSION["nhu"]["main"] = "pouvoir_duplication_objets";
				return "pouvoir_duplication_objets";
			case "pouvoirElasticite":
				$_SESSION["nhu"]["main"] = "pouvoir_elasticite";
				return "pouvoir_elasticite";
			case "pouvoirElectricite":
				$_SESSION["nhu"]["main"] = "pouvoir_electricite";
				return "pouvoir_electricite";
			case "pouvoirElectriciteFilaire":
				$_SESSION["nhu"]["main"] = "pouvoir_electricite_filaire";
				return "pouvoir_electricite_filaire";
			case "pouvoirElementariste":
				$_SESSION["nhu"]["main"] = "pouvoir_elementariste";
				return "pouvoir_elementariste";
			case "pouvoirEnergieNucleaire":
				$_SESSION["nhu"]["main"] = "pouvoir_energie_nucleaire";
				return "pouvoir_energie_nucleaire";
			case "pouvoirExplosion":
				$_SESSION["nhu"]["main"] = "pouvoir_explosion";
				return "pouvoir_explosion";
			case "pouvoirExtensionOsseuse":
				$_SESSION["nhu"]["main"] = "pouvoir_extension_osseuses";
				return "pouvoir_extension_osseuses";
			case "pouvoirFlexibilite":
				$_SESSION["nhu"]["main"] = "pouvoir_flexibilite";
				return "pouvoir_flexibilite";
			case "pouvoirHypnose":
				$_SESSION["nhu"]["main"] = "pouvoir_hypnose";
				return "pouvoir_hypnose";
			case "pouvoirIndestructible":
				$_SESSION["nhu"]["main"] = "pouvoir_indestructible";
				return "pouvoir_indestructible";
			case "pouvoirInvisibilite":
				$_SESSION["nhu"]["main"] = "pouvoir_invisibilite";
				return "pouvoir_invisibilite";
			case "pouvoirInvocationArme":
				$_SESSION["nhu"]["main"] = "pouvoir_invocation_armes";
				return "pouvoir_invocation_armes";
			case "pouvoirLevitation":
				$_SESSION["nhu"]["main"] = "pouvoir_levitation";
				return "pouvoir_levitation";
			case "pouvoirLiquefaction":
				$_SESSION["nhu"]["main"] = "pouvoir_liquefaction";
				return "pouvoir_liquefaction";
			case "pouvoirLycanthropie":
				$_SESSION["nhu"]["main"] = "pouvoir_lycanthropie";
				return "pouvoir_lycanthropie";
			case "pouvoirMagie":
				$_SESSION["nhu"]["main"] = "pouvoir_magie";
				return "pouvoir_magie";
			case "pouvoirManiementArme":
				$_SESSION["nhu"]["main"] = "pouvoir_maniement_armes";
				return "pouvoir_maniement_armes";
			case "pouvoirManipulationCellulaire":
				$_SESSION["nhu"]["main"] = "pouvoir_manipulation_cellulaire";
				return "pouvoir_manipulation_cellulaire";
			case "pouvoirManipulationSouvenir":
				$_SESSION["nhu"]["main"] = "pouvoir_manipulation_souvenirs";
				return "pouvoir_manipulation_souvenirs";
			case "pouvoirMemoireInfinie":
				$_SESSION["nhu"]["main"] = "pouvoir_memoire_infinie";
				return "pouvoir_memoire_infinie";
			case "pouvoirMetamorphose":
				$_SESSION["nhu"]["main"] = "pouvoir_metamorphose";
				return "pouvoir_metamorphose";
			case "pouvoirPasseMuraille":
				$_SESSION["nhu"]["main"] = "pouvoir_passe_muraille";
				return "pouvoir_passe_muraille";
			case "pouvoirPetrification":
				$_SESSION["nhu"]["main"] = "pouvoir_petrification";
				return "pouvoir_petrification";
			case "pouvoirPremonition":
				$_SESSION["nhu"]["main"] = "pouvoir_premonition";
				return "pouvoir_premonition";
			case "pouvoirRegeneration":
				$_SESSION["nhu"]["main"] = "pouvoir_regeneration";
				return "pouvoir_regeneration";
			case "pouvoirRespiration":
				$_SESSION["nhu"]["main"] = "pouvoir_respiration";
				return "pouvoir_respiration";
			case "pouvoirSuccube":
				$_SESSION["nhu"]["main"] = "pouvoir_succube";
				return "pouvoir_succube";
			case "pouvoirSuperForce":
				$_SESSION["nhu"]["main"] = "pouvoir_super_force";
				return "pouvoir_super_force";
			case "pouvoirSuperVitesse":
				$_SESSION["nhu"]["main"] = "pouvoir_super_vitesse";
				return "pouvoir_super_vitesse";
			case "pouvoirTelekinesie":
				$_SESSION["nhu"]["main"] = "pouvoir_telekinesie";
				return "pouvoir_telekinesie";
			case "pouvoirTeleportation":
				$_SESSION["nhu"]["main"] = "pouvoir_teleportation";
				return "pouvoir_teleportation";
			case "pouvoirTeleportationPetite":
				$_SESSION["nhu"]["main"] = "pouvoir_teleportation_petite";
				return "pouvoir_teleportation_petite";
			case "pouvoirVampirisme":
				$_SESSION["nhu"]["main"] = "pouvoir_vampirisme";
				return "pouvoir_vampirisme";
			case "pouvoirVoler":
				$_SESSION["nhu"]["main"] = "pouvoir_voler";
				return "pouvoir_voler";
			
			//Groupes
			case "groupeGuilde":
				$_SESSION["nhu"]["main"] = "groupe_guilde";
				return "groupe_guilde";
			case "groupeBlackEagles":
				$_SESSION["nhu"]["main"] = "groupe_black_eagles";
				return "groupe_black_eagles";
			case "groupeGenCorp":
				$_SESSION["nhu"]["main"] = "groupe_gencorp";
				return "groupe_gencorp";
			case "groupeSiam":
				$_SESSION["nhu"]["main"] = "groupe_siam";
				return "groupe_siam";
			case "groupeLegion":
				$_SESSION["nhu"]["main"] = "groupe_legion";
				return "groupe_legion";
			case "groupeRedRavens":
				$_SESSION["nhu"]["main"] = "groupe_red_ravens";
				return "groupe_red_ravens";
			case "groupeArmoredWolves":
				$_SESSION["nhu"]["main"] = "groupe_armored_wolves";
				return "groupe_armored_wolves";
			case "groupeBloodBorn":
				$_SESSION["nhu"]["main"] = "groupe_blood_born";
				return "groupe_blood_born";
			case "groupeGoldenFlowers":
				$_SESSION["nhu"]["main"] = "groupe_golden_flowers";
				return "groupe_golden_flowers";
			case "groupeInfernalGiants":
				$_SESSION["nhu"]["main"] = "groupe_infernal_giants";
				return "groupe_infernal_giants";
			case "groupeMoonForces":
				$_SESSION["nhu"]["main"] = "groupe_moonforces";
				return "groupe_moonforces";
			case "groupeNewAngels":
				$_SESSION["nhu"]["main"] = "groupe_new_angels";
				return "groupe_new_angels";
			case "groupeRobustImmortals":
				$_SESSION["nhu"]["main"] = "groupe_robust_immortals";
				return "groupe_robust_immortals";
			case "groupeTwinApocalypse":
				$_SESSION["nhu"]["main"] = "groupe_twin_apocalypse";
				return "groupe_twin_apocalypse";
			case "groupeNouveauxHumainsSynthese":
				$_SESSION["nhu"]["main"] = "groupe_nouveaux_humains_synthese";
				return "groupe_nouveaux_humains_synthese";
			
			//Lieux
			
			
			//Planète
			case "planeteGiervia":
				$_SESSION["nhu"]["main"] = "planete_giervia";
				return "planete_giervia";
			
			//Archipèles
			case "archCentis":
				$_SESSION["nhu"]["main"] = "arch_centis";
				return "arch_centis";
			case "archMinaf":
				$_SESSION["nhu"]["main"] = "arch_minaf";
				return "arch_minaf";
			case "archNaef":
				$_SESSION["nhu"]["main"] = "arch_naef";
				return "arch_naef";
			case "archYmever":
				$_SESSION["nhu"]["main"] = "arch_ymever";
				return "arch_ymever";
			
			//Continents
			case "contFontil":
				$_SESSION["nhu"]["main"] = "continent_fontil";
				return "continent_fontil";
			case "contVactil":
				$_SESSION["nhu"]["main"] = "continent_vactil";
				return "continent_vactil";
			case "contXentil":
				$_SESSION["nhu"]["main"] = "continent_xentil";
				return "continent_xentil";
			
			//Pays
			case "paysAbaltia":
				$_SESSION["nhu"]["main"] = "pays_abaltia";
				return "pays_abaltia";
			case "paysAmanis":
				$_SESSION["nhu"]["main"] = "pays_amanis";
				return "pays_amanis";
			case "paysAthogev":
				$_SESSION["nhu"]["main"] = "pays_athogev";
				return "pays_athogev";
			case "paysBammaz":
				$_SESSION["nhu"]["main"] = "pays_bammaz";
				return "pays_bammaz";
			case "paysCetnio":
				$_SESSION["nhu"]["main"] = "pays_cetnio";
				return "pays_cetnio";
			case "paysDeracus":
				$_SESSION["nhu"]["main"] = "pays_deracus";
				return "pays_deracus";
			case "paysDomotress":
				$_SESSION["nhu"]["main"] = "pays_domotress";
				return "pays_domotress";
			case "paysDontol":
				$_SESSION["nhu"]["main"] = "pays_dontol";
				return "pays_dontol";
			case "paysEfellys":
				$_SESSION["nhu"]["main"] = "pays_efellys";
				return "pays_efellys";
			case "paysGiotry":
				$_SESSION["nhu"]["main"] = "pays_giotry";
				return "pays_giotry";
			case "paysGodoaves":
				$_SESSION["nhu"]["main"] = "pays_godoaves";
				return "pays_godoaves";
			case "paysHutlia":
				$_SESSION["nhu"]["main"] = "pays_hutlia";
				return "pays_hutlia";
			case "paysMahinu":
				$_SESSION["nhu"]["main"] = "pays_mahinu";
				return "pays_mahinu";
			case "paysNibalu":
				$_SESSION["nhu"]["main"] = "pays_nibalu";
				return "pays_nibalu";
			case "paysPediaf":
				$_SESSION["nhu"]["main"] = "pays_pediaf";
				return "pays_pediaf";
			case "paysSassiep":
				$_SESSION["nhu"]["main"] = "pays_sassiep";
				return "pays_sassiep";
			case "paysTimelgia":
				$_SESSION["nhu"]["main"] = "pays_timelgia";
				return "pays_timelgia";
			case "paysUmek":
				$_SESSION["nhu"]["main"] = "pays_umek";
				return "pays_umek";
			case "paysVolamez":
				$_SESSION["nhu"]["main"] = "pays_volamez";
				return "pays_volamez";
			case "paysWembet":
				$_SESSION["nhu"]["main"] = "pays_wembet";
				return "pays_wembet";
			case "paysZemta":
				$_SESSION["nhu"]["main"] = "pays_zemta";
				return "pays_zemta";
			
			//Villes
			case "villeBeodo":
				$_SESSION["nhu"]["main"] = "ville_beodo";
				return "ville_beodo";
			case "villeCalpeo":
				$_SESSION["nhu"]["main"] = "ville_calpeo";
				return "ville_calpeo";
			case "villeDamonia":
				$_SESSION["nhu"]["main"] = "ville_damonia";
				return "ville_damonia";
			case "villeGuifon":
				$_SESSION["nhu"]["main"] = "ville_guifon";
				return "ville_guifon";
			case "villeNiles":
				$_SESSION["nhu"]["main"] = "ville_niles";
				return "ville_niles";
			case "villeNyasyl":
				$_SESSION["nhu"]["main"] = "ville_nyasyl";
				return "ville_nyasyl";
			case "villeRahrames":
				$_SESSION["nhu"]["main"] = "ville_rahrames";
				return "ville_rahrames";
			case "villeRisann":
				$_SESSION["nhu"]["main"] = "ville_risann";
				return "ville_risann";
			case "villeRolever":
				$_SESSION["nhu"]["main"] = "ville_rolever";
				return "ville_rolever";
			case "villeSarani":
				$_SESSION["nhu"]["main"] = "ville_sarani";
				return "ville_sarani";
			case "villeTricome":
				$_SESSION["nhu"]["main"] = "ville_tricome";
				return "ville_tricome";
			case "villeWarfang":
				$_SESSION["nhu"]["main"] = "ville_warfang";
				return "ville_warfang";
			case "villeWendom":
				$_SESSION["nhu"]["main"] = "ville_wendom";
				return "ville_wendom";
			
			//Mois
			case "moisBinn":
				$_SESSION["nhu"]["main"] = "mois_binn";
				return "mois_binn";
			case "moisDaggahar":
				$_SESSION["nhu"]["main"] = "mois_daggahar";
				return "mois_daggahar";
			case "moisFiumo":
				$_SESSION["nhu"]["main"] = "mois_fiumo";
				return "mois_fiumo";
			case "moisJattam":
				$_SESSION["nhu"]["main"] = "mois_jattam";
				return "mois_jattam";
			case "moisMottas":
				$_SESSION["nhu"]["main"] = "mois_mottas";
				return "mois_mottas";
			case "moisRetiep":
				$_SESSION["nhu"]["main"] = "mois_retiep";
				return "mois_retiep";
			case "moisSarry":
				$_SESSION["nhu"]["main"] = "mois_sarry";
				return "mois_sarry";
			case "moisThiom":
				$_SESSION["nhu"]["main"] = "mois_thiom";
				return "mois_thiom";
			case "moisVerli":
				$_SESSION["nhu"]["main"] = "mois_verli";
				return "mois_verli";
			case "moisWannu":
				$_SESSION["nhu"]["main"] = "mois_wannu";
				return "mois_wannu";
			
			//Théories
			case "theories":
				$_SESSION["nhu"]["main"] = "theories";
				return "theories";
			case "geneDrumel":
				$_SESSION["nhu"]["main"] = "gene_drumel";
				return "gene_drumel";
			case "nouveauHumain":
				$_SESSION["nhu"]["main"] = "nouveau_humain";
				return "nouveau_humain";
			case "nouveauHumainSynthese":
				$_SESSION["nhu"]["main"] = "nouveau_humain_synthese";
				return "nouveau_humain_synthese";
			
			//Default
			default:
				return "main";
		}
	}
}
?>
