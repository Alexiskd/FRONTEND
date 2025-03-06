import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { Box, CircularProgress } from '@mui/material';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from "./appbar.jsx";
import Footer from './PagePrincipale/footer.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { DataProvider } from './PagePrincipale/DataContext.jsx';
import ProductPage from './PagePrincipale/ProductPage.jsx';
import { preloadBrandsData, preloadKeysData } from './brandsApi';

// -----------------------
// Redirections legacy
// -----------------------
const redirections = {
  "/commander/DMC/cle/null/Clé-Dmc-kaba": {
    numero: "https://www.cleservice.com/2-548-cle-DMC-cle-kaba-dmc-reproduction-cle.html"
  },
  "/commander/DMC/cle/null/Clé-Dmc": {
    numero: "https://www.cleservice.com/4-38-cle-DMC-dmc-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-38-cle-DMC-dmc-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-STS-ou-TESI": {
    numero: "https://www.cleservice.com/2-287-cle-DOM-sts-ou-tesi-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-RS-8": {
    numero: "https://www.cleservice.com/2-42-cle-DOM-rs-8-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-RS-5": {
    numero: "https://www.cleservice.com/2-41-cle-DOM-rs-5-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-RN": {
    numero: "https://www.cleservice.com/4-356-cle-DOM-rn-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-PP1024": {
    numero: "https://www.cleservice.com/4-355-cle-DOM-pp1024-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-Paq-Label": {
    numero: "https://www.cleservice.com/2-445-cle-DOM-paq-label-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-ix-6-SR-a-bille": {
    numero: "https://www.cleservice.com/2-219-cle-DOM-ix-6-sr-a-bille-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-ix-6-KG-Longue-a-bille": {
    numero: "https://www.cleservice.com/2-216-cle-DOM-ix-6-kg-longue-a-bille-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-ix-5-KG-a-bille": {
    numero: "https://www.cleservice.com/2-211-cle-DOM-ix-5-kg-a-bille-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-ix-5-HT": {
    numero: "https://www.cleservice.com/2-213-cle-DOM-ix-5-ht-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-ix-10-Longue-a-bille": {
    numero: "https://www.cleservice.com/2-215-cle-DOM-ix-10-longue-a-bille-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-sans-bille": {
    postal: "https://www.cleservice.com/1-341-cle-DOM-dom-sans-bille-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-a-bille": {
    postal: "https://www.cleservice.com/1-342-cle-DOM-dom-a-bille-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-Diamant": {
    numero: "https://www.cleservice.com/2-224-cle-DOM-diamant-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-Darmon-ou-Cyliq-IX6": {
    numero: "https://www.cleservice.com/2-430-cle-DOM-darmon-ou-cyliq-ix6-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-430-cle-DOM-darmon-ou-cyliq-ix6-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-Darmon-ou-Cyliq-IX5": {
    numero: "https://www.cleservice.com/2-194-cle-DOM-darmon-ou-cyliq-ix5-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-194-cle-DOM-darmon-ou-cyliq-ix5-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-Corbin": {
    numero: "https://www.cleservice.com/4-299-cle-DOM-corbin-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-299-cle-DOM-corbin-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-Cogeferm-IX6-SR-/-IX10": {
    numero: "https://www.cleservice.com/2-431-cle-DOM-cogeferm-ix6-sr-ix10-reproduction-cle.html"
  },
  "/commander/DOM/cle/null/Clé-Dom-Cogeferm-IX5-/-IX6": {
    numero: "https://www.cleservice.com/2-210-cle-DOM-cogeferm-ix5-ix6-reproduction-cle.html"
  },
  "/commander/ERREBI/cle/null/Clé-Errebi": {
    numero: "https://www.cleservice.com/4-43-cle-ERREBI-errebi-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-43-cle-ERREBI-errebi-reproduction-cle.html"
  },
  "/commander/EURO-LOCKS/cle/null/Clé-Euro-locks": {
    numero: "https://www.cleservice.com/4-44-cle-EURO-LOCKS-euro-lock-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-44-cle-EURO-LOCKS-euro-lock-reproduction-cle.html"
  },
  "/commander/FICHET/cle/null/Clé-Fichet-F3D": {
    numero: "https://www.cleservice.com/2-552-cle-FICHET-f3d-reproduction-cle.html"
  },
  "/commander/FICHET/cle/null/Clé-Fichet-787-Z": {
    numero: "https://www.cleservice.com/2-52-cle-FICHET-787-z-reproduction-cle.html"
  },
  "/commander/FICHET/cle/null/Clé-Fichet-787-S": {
    numero: "https://www.cleservice.com/2-46-cle-FICHET-787-s-reproduction-cle.html"
  },
  "/commander/FICHET/cle/null/Clé-Fichet-690": {
    postal: "https://www.cleservice.com/1-50-cle-FICHET-690-reproduction-cle.html"
  },
  "/commander/FICHET/cle/null/Clé-Fichet-480-484": {
    postal: "https://www.cleservice.com/1-49-cle-FICHET-480-484-reproduction-cle.html"
  },
  "/commander/FONTAINE/cle/null/Clé-Fontaine-Deny": {
    numero: "https://www.cleservice.com/2-55-cle-FONTAINE-deny-fontaine-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-55-cle-FONTAINE-deny-fontaine-reproduction-cle.html"
  },
  "/commander/FTH/cle/null/Clé-Fth-Ariane": {
    numero: "https://www.cleservice.com/2-362-cle-FTH-ariane-reproduction-cle.html"
  },
  "/commander/FTH/cle/null/Clé-Fth-Adriatic": {
    numero: "https://www.cleservice.com/2-161-cle-FTH-adriatic-reproduction-cle.html"
  },
  "/commander/FTH/cle/null/Clé-Fth-Adria": {
    numero: "https://www.cleservice.com/2-226-cle-FTH-adria-reproduction-cle.html"
  },
  "/commander/GEBA/cle/null/Clé-Geba": {
    numero: "https://www.cleservice.com/4-64-cle-GEBA-geba-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-64-cle-GEBA-geba-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Y8": {
    numero: "https://www.cleservice.com/2-550-cle-HERACLES-y8-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Y5": {
    numero: "https://www.cleservice.com/2-562-cle-HERACLES-y5-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Vigie": {
    numero: "https://www.cleservice.com/2-1-cle-HERACLES-vigie-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-1-cle-HERACLES-vigie-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-vak": {
    postal: "https://www.cleservice.com/1-368-cle-HERACLES-vak-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Snake": {
    numero: "https://www.cleservice.com/2-553-cle-HERACLES-snake-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Salomé-magnétique": {
    numero: "https://www.cleservice.com/2-564-cle-HERACLES-salome-magnetique-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Pollux-7000": {
    numero: "https://www.cleservice.com/2-6-cle-HERACLES-pollux-7000-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Platinium": {
    numero: "https://www.cleservice.com/2-568-cle-HERACLES-platinium-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Keso-4000S-Omega": {
    numero: "https://www.cleservice.com/2-555-cle-HERACLES-keso-4000s-omega-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Keso-2000-S-Omega": {
    numero: "https://www.cleservice.com/2-5-cle-HERACLES-keso-2000-s-omega-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-5-cle-HERACLES-keso-2000-s-omega-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Keso-2000-S": {
    numero: "https://www.cleservice.com/2-4-cle-HERACLES-keso-2000-s-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-4-cle-HERACLES-keso-2000-s-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-GMO-6": {
    numero: "https://www.cleservice.com/2-367-cle-HERACLES-gmo-6-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Dom-SR": {
    numero: "https://www.cleservice.com/2-372-cle-HERACLES-dom-sr-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Dom-IX-6-a-Bille": {
    numero: "https://www.cleservice.com/2-3-cle-HERACLES-dom-ix-6-a-bille-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-Champion": {
    numero: "https://www.cleservice.com/2-569-cle-HERACLES-champion-reproduction-cle.html"
  },
  "/commander/HERACLES/cle/null/Clé-Heracles-7": {
    numero: "https://www.cleservice.com/2-369-cle-HERACLES-7-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-369-cle-HERACLES-7-reproduction-cle.html"
  },
  "/commander/ISEO/cle/null/Clé-Iseo-R6": {
    numero: "https://www.cleservice.com/2-67-cle-ISEO-r6-reproduction-cle.html"
  },
  "/commander/ISEO/cle/null/Clé-Iseo-R50": {
    numero: "https://www.cleservice.com/2-304-cle-ISEO-r50-reproduction-cle.html"
  },
  "/commander/ISEO/cle/null/Clé-Iseo-R14": {
    numero: "https://www.cleservice.com/2-68-cle-ISEO-r14-reproduction-cle.html"
  },
  "/commander/ISEO/cle/null/Clé-Iseo": {
    postal: "https://www.cleservice.com/1-66-cle-ISEO-iseo-reproduction-cle.html"
  },
  "/commander/ISEO/cle/null/Clé-Iseo-CSR-R9": {
    numero: "https://www.cleservice.com/2-563-cle-ISEO-csr-r9-reproduction-cle.html"
  },
  "/commander/IZIS/cle/null/Clé-Izis-Cavers": {
    numero: "https://www.cleservice.com/2-81-cle-IZIS-cavers-reproduction-cle.html"
  },
  "/commander/JMA/cle/null/Clé-Jma": {
    numero: "https://www.cleservice.com/4-82-cle-JMA-jma-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-82-cle-JMA-jma-reproduction-cle.html"
  },
  "/commander/JPM/cle/null/Clé-Jpm-Keso-4000S-Omega": {
    numero: "https://www.cleservice.com/2-554-cle-JPM-keso-4000s-omega-reproduction-cle.html"
  },
  "/commander/JPM/cle/null/Clé-Jpm-Vega-Cisa": {
    numero: "https://www.cleservice.com/2-79-cle-JPM-vega-cisa-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-79-cle-JPM-vega-cisa-reproduction-cle.html"
  },
  "/commander/JPM/cle/null/Clé-Jpm-Surf": {
    numero: "https://www.cleservice.com/2-78-cle-JPM-surf-reproduction-cle.html"
  },
  "/commander/JPM/cle/null/Clé-Jpm-SP": {
    numero: "https://www.cleservice.com/2-77-cle-JPM-sp-reproduction-cle.html"
  },
  "/commander/JPM/cle/null/Clé-Jpm-Quarz-Up": {
    numero: "https://www.cleservice.com/2-559-cle-JPM-quarz-up-reproduction-cle.html"
  },
  "/commander/JPM/cle/null/Clé-Jpm-Keso-1000-ou-2000-ou-2000-S-Omega": {
    numero: "https://www.cleservice.com/2-240-cle-JPM-keso-1000-ou-2000-ou-2000-s-omega-reproduction-cle.html"
  },
  "/commander/KESO/cle/null/Clé-Keso-1000-ou-2000-Omega": {
    numero: "https://www.cleservice.com/2-146-cle-KESO-1000-ou-2000-reproduction-cle.html"
  },
  "/commander/KESO/cle/null/Clé-Keso-1000-ou-2000": {
    // En cas de conflit, ici on choisit pour 'numero' la deuxième URL indiquée
    numero: "https://www.cleservice.com/2-262-cle-KESO-1000-ou-2000-omega-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-262-cle-KESO-1000-ou-2000-omega-reproduction-cle.html"
  },
  "/commander/LAPERCHE/cle/null/Clé-Laperche-Gemm-code": {
    numero: "https://www.cleservice.com/2-290-cle-LAPERCHE-gemm-code-reproduction-cle.html"
  },
  "/commander/LAPERCHE/cle/null/Clé-Laperche-Gemm-5-ou-6": {
    numero: "https://www.cleservice.com/2-292-cle-LAPERCHE-gemm-5-ou-6-reproduction-cle.html"
  },
  "/commander/LAPERCHE/cle/null/Clé-Laperche-GEMM-24": {
    numero: "https://www.cleservice.com/4-388-cle-LAPERCHE-gemm-24-reproduction-cle.html"
  },
  "/commander/LAPERCHE/cle/null/Clé-Laperche-Diam-XL": {
    numero: "https://www.cleservice.com/2-98-cle-LAPERCHE-diam-xl-reproduction-cle.html"
  },
  "/commander/LAPERCHE/cle/null/Clé-Laperche-Diam-Plus": {
    numero: "https://www.cleservice.com/4-294-cle-LAPERCHE-diam-plus-reproduction-cle.html"
  },
  "/commander/LAPERCHE/cle/null/Clé-Laperche-Diam": {
    numero: "https://www.cleservice.com/4-294-cle-LAPERCHE-diam-plus-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-97-cle-LAPERCHE-diam-reproduction-cle.html"
  },
  // Lien Lotus (aucun ancien lien fourni, seule la nouvelle URL est indiquée)
  "/commander/LOTUS": {
    // Par exemple, pour afficher la nouvelle page Lotus
    any: "https://www.cleservice.com/1-100-cle-LOTUS-lotus-reproduction-cle.html"
  },
  "/commander/MEDECO/cle/null/Clé-Medeco-Duracam": {
    numero: "https://www.cleservice.com/2-323-cle-MEDECO-duracam-reproduction-cle.html"
  },
  "/commander/MEDECO/cle/null/Clé-Medeco-Biaxiale": {
    numero: "https://www.cleservice.com/2-101-cle-MEDECO-medeco-biaxiale-reproduction-cle.html"
  },
  "/commander/MERONI/cle/null/Clé-Meroni": {
    numero: "https://www.cleservice.com/4-104-cle-MERONI-meroni-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-104-cle-MERONI-meroni-reproduction-cle.html"
  },
  "/commander/METALUX/cle/null/Clé-Metalux-Conforlux-3850": {
    numero: "https://www.cleservice.com/4-325-cle-METALUX-conforlux-3850-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-325-cle-METALUX-conforlux-3850-reproduction-cle.html"
  },
  "/commander/METALUX/cle/null/Clé-Metalux": {
    numero: "https://www.cleservice.com/4-105-cle-METALUX-metalux-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-105-cle-METALUX-metalux-reproduction-cle.html"
  },
  "/commander/MOTTURA/cle/null/Clé-Mottura": {
    postal: "https://www.cleservice.com/1-107-cle-MOTTURA-mottura-reproduction-cle.html"
  },
  "/commander/MOTTURA/cle/null/Clé-Mottura-CR-double-panneton": {
    numero: "http://cleservice.com/4-108-cle-MOTTURA-cr-double-panneton-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-108-cle-MOTTURA-cr-double-panneton-reproduction-cle.html"
  },
  "/commander/MOTTURA/cle/null/Clé-Mottura-Champion-38": {
    numero: "https://www.cleservice.com/2-106-cle-MOTTURA-champion-38-reproduction-cle.html"
  },
  "/commander/MOTTURA/cle/null/Clé-Mottura-Champion-30-ou-31": {
    numero: "https://www.cleservice.com/2-426-cle-MOTTURA-champion-30-ou-31-reproduction-cle.html"
  },
  "/commander/MOTTURA/cle/null/Clé-Mottura-C-28": {
    numero: "https://www.cleservice.com/2-449-cle-MOTTURA-c-28-reproduction-cle.html"
  },
  "/commander/MUEL/cle/null/Clé-Muel": {
    numero: "https://www.cleservice.com/1-109-cle-MUEL-muel-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-MT5+": {
    numero: "https://www.cleservice.com/2-551-cle-MUL-T-LOCK-mt5-plus-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-Interactive+-262S": {
    numero: "https://www.cleservice.com/2-561-cle-MUL-T-LOCK-interactive-plus-262s-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-Interactive-262-S-Tete-Bleue": {
    numero: "https://www.cleservice.com/2-110-cle-MUL-T-LOCK-interactive-262-s-tete-bleue-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-Interactive-248-/-262-B-ou-G": {
    numero: "https://www.cleservice.com/2-112-cle-MUL-T-LOCK-interactive-248-262-b-ou-g-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-Interactive-262-S-Tete-Metal": {
    numero: "https://www.cleservice.com/2-111-cle-MUL-T-LOCK-interactive-262-s-tete-metal-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-Integrator": {
    numero: "https://www.cleservice.com/2-327-cle-MUL-T-LOCK-integrator-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-Gamma": {
    numero: "https://www.cleservice.com/2-113-cle-MUL-T-LOCK-gamma-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-Darmon-ou-Cyliq-248-S": {
    numero: "https://www.cleservice.com/2-340-cle-MUL-T-LOCK-darmon-ou-cyliq-248-s-reproduction-cle.html"
  },
  "/commander/MUL-T-LOCK/cle/null/Clé-Mul-t-lock-7-X-7": {
    numero: "https://www.cleservice.com/2-326-cle-MUL-T-LOCK-7-x-7-reproduction-cle.html"
  },
  "/commander/PICARD/cle/null/Clé-Picard-Vak": {
    numero: "https://www.cleservice.com/2-117-cle-PICARD-vak-mobile-reproduction-cle.html"
  },
  "/commander/PICARD/cle/null/Clé-Picard-Vigie": {
    numero: "https://www.cleservice.com/2-120-cle-PICARD-vigie-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-120-cle-PICARD-vigie-reproduction-cle.html"
  },
  "/commander/PICARD/cle/null/Clé-Picard-Vigie-avec-mobile": {
    numero: "https://www.cleservice.com/2-557-cle-PICARD-vigie-avec-mobile-reproduction-cle.html"
  },
  "/commander/PICARD/cle/null/Clé-Picard-Vigistar": {
    numero: "https://www.cleservice.com/2-118-cle-PICARD-vigistar-reproduction-cle.html"
  },
  "/commander/PICARD/cle/null/Clé-Picard-VTX": {
    numero: "https://www.cleservice.com/2-567-cle-PICARD-vtx-reproduction-cle.html"
  },
  "/commander/POLLUX/cle/null/Clé-Pollux-GMO5-GMO6-GMO8": {
    numero: "https://www.cleservice.com/2-123-cle-POLLUX-gmo5-gmo6-gmo8-reproduction-cle.html"
  },
  "/commander/POLLUX/cle/null/Clé-Pollux-GMO-5-/-GMO-6-/-GMO-8-Cle-de-Passe": {
    numero: "https://www.cleservice.com/2-424-cle-POLLUX-gmo-5-gmo-6-gmo-8-cle-de-passe-reproduction-cle.html"
  },
  "/commander/POLLUX/cle/null/Clé-Pollux-7000": {
    numero: "https://www.cleservice.com/2-122-cle-POLLUX-7000-reproduction-cle.html"
  },
  "/commander/POLLUX/cle/null/Clé-Pollux-5-ou-7-ailettes": {
    numero: "https://www.cleservice.com/2-121-cle-POLLUX-5-ou-7-ailettes-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-121-cle-POLLUX-5-ou-7-ailettes-reproduction-cle.html"
  },
  "/commander/RONIS/cle/null/Clé-Ronis": {
    numero: "https://www.cleservice.com/4-127-cle-RONIS-cle-plate-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-127-cle-RONIS-cle-plate-reproduction-cle.html"
  },
  "/commander/RONIS/cle/null/Clé-Ronis-Cle-Tubulaire": {
    numero: "https://www.cleservice.com/4-233-cle-RONIS-cle-tubulaire-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-233-cle-RONIS-cle-tubulaire-reproduction-cle.html"
  },
  "/commander/SILCA/cle/null/Clé-Silca": {
    postal: "http://localhost:5173/commander/SILCA/cle/null/Clé-Silca?mode=postal"
  },
  "/commander/TESA/cle/null/Clé-Tesa-IPS": {
    numero: "https://www.cleservice.com/2-278-cle-TESA-ips-reproduction-cle.html"
  },
  "/commander/TESA/cle/null/Clé-Tesa-T-10": {
    numero: "https://www.cleservice.com/2-276-cle-TESA-t-10-reproduction-cle.html"
  },
  "/commander/TESA/cle/null/Clé-Tesa-T-12": {
    numero: "https://www.cleservice.com/2-391-cle-TESA-t-12-reproduction-cle.html"
  },
  "/commander/TESA/cle/null/Clé-Tesa-T-60": {
    numero: "https://www.cleservice.com/1-274-cle-TESA-t-60-reproduction-cle.html",
    postal: "https://www.cleservice.com/2-275-cle-TESA-t-60-cle-de-passe-reproduction-cle.html"
  },
  "/commander/TESA/cle/null/Clé-Tesa-T-80": {
    numero: "https://www.cleservice.com/2-273-cle-TESA-t-80-cle-de-passe-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-272-cle-TESA-t-80-profil-ts-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-VRX": {
    numero: "https://www.cleservice.com/2-560-cle-VACHETTE-vrx-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-VMI": {
    numero: "https://www.cleservice.com/2-556-cle-VACHETTE-vmi-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-VIP": {
    numero: "https://www.cleservice.com/2-135-cle-VACHETTE-vip-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-V5-Code": {
    numero: "https://www.cleservice.com/2-565-cle-VACHETTE-v5-code-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-V5": {
    numero: "https://www.cleservice.com/4-134-cle-VACHETTE-v5-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-134-cle-VACHETTE-v5-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-Radial-SI": {
    numero: "https://www.cleservice.com/2-132-cle-VACHETTE-radial-si-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-132-cle-VACHETTE-radial-si-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-Radial-S": {
    numero: "https://www.cleservice.com/2-133-cle-VACHETTE-radial-s-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-133-cle-VACHETTE-radial-s-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-Radial-NT": {
    numero: "https://www.cleservice.com/2-131-cle-VACHETTE-radial-nt-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-HDI": {
    numero: "https://www.cleservice.com/2-130-cle-VACHETTE-hdi-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-AxiTec": {
    numero: "https://www.cleservice.com/2-576-cle-VACHETTE-axitec-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Clé-Vachette-AxiHome": {
    numero: "https://www.cleservice.com/2-575-cle-VACHETTE-axihome-reproduction-cle.html"
  },
  "/commander/VACHETTE/cle/null/Vachette-Volt": {
    numero: "https://www.cleservice.com/2-566-cle-VACHETTE-volt-reproduction-cle.html"
  },
  "/commander/VAK/cle/null/Clé-Vak": {
    numero: "https://www.cleservice.com/4-136-cle-VAK-vak-reproduction-cle.html",
    postal: "https://www.cleservice.com/1-136-cle-VAK-vak-reproduction-cle.html"
  },
  "/commander/VIGISTAR/cle/null/Clé-Vigistar-Picard": {
    numero: "https://www.cleservice.com/2-138-cle-VIGISTAR-picard-vigistar-reproduction-cle.html"
  },
  "/commander/YALE/cle/null/Clé-Yale---Tesa": {
    postal: "https://www.cleservice.com/1-139-cle-YALE-yale--tesa-reproduction-cle.html"
  },
  "/commander/YALE/cle/null/Clé-Yale-TX-80-a-bille": {
    numero: "https://www.cleservice.com/2-338-cle-YALE-tx-80-a-bille-reproduction-cle.html"
  },
  "/commander/YALE/cle/null/Clé-Yale-Tenor": {
    numero: "https://www.cleservice.com/2-419-cle-YALE-tenor-reproduction-cle.html"
  },
  "/commander/YALE/cle/null/Clé-Yale-TE-6": {
    numero: "https://www.cleservice.com/2-420-cle-YALE-te-6-reproduction-cle.html"
  },
  "/commander/YALE/cle/null/Clé-Yale-T-12": {
    numero: "https://www.cleservice.com/2-418-cle-YALE-t-12-reproduction-cle.html"
  },
  "/commander/YALE/cle/null/Clé-Yale-T-10": {
    numero: "https://www.cleservice.com/2-333-cle-YALE-t-10-reproduction-cle.html"
  },
  "/commander/YALE/cle/null/Clé-Yale-IPS": {
    numero: "https://www.cleservice.com/2-331-cle-YALE-ips-reproduction-cle.html"
  },
  "/commander/YALE/cle/null/Clé-Yale-Bola": {
    numero: "https://www.cleservice.com/2-417-cle-YALE-bola-reproduction-cle.html"
  }
};

const LegacyRedirectHandler = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');
  const redirectUrl =
    redirections[location.pathname] &&
    (redirections[location.pathname][mode] || redirections[location.pathname].any);

  return redirectUrl ? <Navigate replace to={redirectUrl} /> : <Outlet />;
};

// -----------------------
// Composants en lazy loading
// -----------------------
const Barreadmin = lazy(() => import('../AppAdmin/barreadmin.jsx'));
const Ajoutez = lazy(() => import('../AppAdmin/ajoutez.jsx'));
const Commande = lazy(() => import('../AppAdmin/commande.jsx'));
const Messages = lazy(() => import('../AppAdmin/Messages.jsx'));
const Loginside = lazy(() => import('../AppAdmin/loginside.jsx'));
const MarqueAdmin = lazy(() => import('../AppAdmin/MarqueAdmin.jsx'));
const StatistiquesCommandes = lazy(() => import('../AppAdmin/stat.jsx'));

const CommandePagePanier = lazy(() => import('./PagePrincipale/commandePagePanier.jsx'));
const Login = lazy(() => import("../SiteWeb/HomePage.jsx"));
import Catalogue from "./PagePrincipale/catalogue.jsx";
const CleDynamicPage = lazy(() => import("./PagePrincipale/CleDynamicPage.jsx"));
const Coffrefort = lazy(() => import('./PagePrincipale/coffrefort.jsx'));
const Telecomande = lazy(() => import('./PagePrincipale/telecommande.jsx'));
const Badgeuu = lazy(() => import('./PagePrincipale/badge.jsx'));
const ServiceRedirect = lazy(() => import('./PagePrincipale/serviceredirect.jsx'));
const Contact = lazy(() => import('./PagePrincipale/contact.jsx'));
const Devis = lazy(() => import('./UserPA/devis.jsx'));
const TutorialPopup = lazy(() => import('./PagePrincipale/tuto.jsx'));
const AboutUs = lazy(() => import('./PagePrincipale/aboutus.jsx'));
const CommandePage = lazy(() => import('./PagePrincipale/commandePage.jsx'));
const PaymentSuccess = lazy(() => import('./PagePrincipale/PaymentSuccess.jsx'));
const PaymentCancel = lazy(() => import('./PagePrincipale/PaymentCancel.jsx'));
const MultiImageUploader = lazy(() => import('../AppAdmin/multi.jsx'));
const PolitiqueConfidentialite = lazy(() => import('./PagePrincipale/politique.jsx'));
const MentionsLegales = lazy(() => import('./PagePrincipale/mentionlegal.jsx'));
const ConditionsGeneralesDeVente = lazy(() => import('./PagePrincipale/conditiongene.jsx'));
const KeySearch = lazy(() => import('./PagePrincipale/keyshearch.jsx'));

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const ProtectedRouteWrapper = ({ children }) => {
  const isAuthenticated = () => !!localStorage.getItem('token');
  return isAuthenticated() ? children : <Navigate to="/app" />;
};

const App = () => {
  const location = useLocation();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (
      location.pathname === '/trouvez.php' ||
      location.pathname === '/catalogue-cles-coffre.php'
    ) {
      setShowTutorial(true);
    } else {
      setShowTutorial(false);
    }
  }, [location]);

  const handleCloseTutorial = () => setShowTutorial(false);
  const isAppRoute = location.pathname.startsWith('/app');

  // Préchargement immédiat des modules lazy
  useEffect(() => {
    import("./PagePrincipale/CleDynamicPage.jsx");
    import("../AppAdmin/barreadmin.jsx");
    import("../AppAdmin/ajoutez.jsx");
    import("../AppAdmin/commande.jsx");
    import("../AppAdmin/Messages.jsx");
    import("../AppAdmin/loginside.jsx");
    import("../AppAdmin/MarqueAdmin.jsx");
    import("../AppAdmin/stat.jsx");
    import("./PagePrincipale/commandePagePanier.jsx");
    import("./PagePrincipale/coffrefort.jsx");
    import("./PagePrincipale/telecommande.jsx");
    import("./PagePrincipale/badge.jsx");
    import("./PagePrincipale/serviceredirect.jsx");
    import("./PagePrincipale/contact.jsx");
    import("./UserPA/devis.jsx");
    import("./PagePrincipale/tuto.jsx");
    import("./PagePrincipale/aboutus.jsx");
    import("./PagePrincipale/commandePage.jsx");
    import("./PagePrincipale/PaymentSuccess.jsx");
    import("./PagePrincipale/PaymentCancel.jsx");
    import("../AppAdmin/multi.jsx");
    import("./PagePrincipale/politique.jsx");
    import("./PagePrincipale/mentionlegal.jsx");
    import("./PagePrincipale/conditiongene.jsx");
    import("./PagePrincipale/keyshearch.jsx");
  }, []);

  // Préchargement des données hors espace admin
  useEffect(() => {
    if (!location.pathname.startsWith('/app')) {
      preloadBrandsData()
        .then((brandsData) => {
          console.log("Marques préchargées :", brandsData);
          brandsData.forEach((brand) => {
            preloadKeysData(brand.nom)
              .then((keysData) => {
                console.log(`Clés préchargées pour ${brand.nom} :`, keysData);
              })
              .catch((err) =>
                console.error(`Erreur lors du préchargement des clés pour ${brand.nom} :`, err)
              );
          });
        })
        .catch((err) => console.error("Erreur lors du préchargement des marques :", err));
    }
  }, [location.pathname]);

  return (
    <CartProvider>
      <DataProvider>
        <>
          <Helmet>
            {/* Insérez ici vos métadonnées */}
          </Helmet>
          <noscript>
            <div style={{ padding: '1rem', textAlign: 'center', background: '#f8d7da', color: '#721c24' }}>
              Cette application fonctionne mieux avec JavaScript activé.
            </div>
          </noscript>
          <AppContainer className="app">
            {!isAppRoute && <Header />}
            {showTutorial && (
              <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}>Chargement du tutoriel...</div>}>
                <TutorialPopup onClose={handleCloseTutorial} />
              </Suspense>
            )}
            <Suspense fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
                <CircularProgress />
              </Box>
            }>
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<Login />} />
                <Route path="/index.php" element={<Login />} />
                <Route path="/trouvez.php" element={<Catalogue />} />
                <Route path="/catalogue-cles-coffre.php" element={<Coffrefort />} />
                <Route path="/catalogue-telecommandes.php" element={<Telecomande />} />
                <Route path="/badges.php" element={<Badgeuu />} />
                <Route path="/services.php" element={<ServiceRedirect />} />
                <Route path="/cle/double-de-cle.html" element={<ServiceRedirect />} />
                <Route path="/zone.php" element={<ServiceRedirect />} />
                <Route path="/paiement_devis.php" element={<ServiceRedirect />} />
                <Route path="/recherche.php" element={<ServiceRedirect />} />
                <Route path="/contact.php" element={<Contact />} />
                <Route path="/commande-success" element={<PaymentSuccess />} />
                <Route path="/commande-cancel" element={<PaymentCancel />} />
                <Route path="/:brandFull" element={<CleDynamicPage />} />
                <Route path="/devis.php" element={<Devis />} />
                <Route path="/qui.php" element={<AboutUs />} />
                {/* Regroupement des routes sous /commander pour gestion des anciennes URL */}
                <Route path="/commander/*" element={<LegacyRedirectHandler />}>
                  {/* Si aucun ancien lien n’est détecté, on affiche la page commande */}
                  <Route path=":brandName/cle/:referenceEbauche/:articleName" element={<CommandePage />} />
                  {/* Vous pouvez ajouter ici d’autres routes sous /commander */}
                  <Route path="*" element={
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                      <h1 style={{ fontSize: '3rem', color: '#FF4D4F' }}>404 - Page Non Trouvée</h1>
                      <p style={{ fontSize: '1.5rem', color: '#555' }}>
                        La page que vous recherchez n'existe pas ou a été déplacée.
                      </p>
                    </div>
                  }/>
                </Route>
                <Route path="/commande-panier" element={<CommandePagePanier />} />
                <Route path="/upload-multiple" element={<MultiImageUploader />} />
                <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/conditions-generales" element={<ConditionsGeneralesDeVente />} />
                <Route path="/produit/:brandName/:productName" element={<ProductPage />} />

                {/* Routes Admin protégées */}
                <Route
                  path="/app/admin/*"
                  element={
                    <ProtectedRouteWrapper>
                      <Box sx={{ display: 'flex' }}>
                        <Suspense fallback={<div>Chargement de l'administration...</div>}>
                          <Barreadmin />
                        </Suspense>
                        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: '240px' }}>
                          <Suspense fallback={<div>Chargement...</div>}>
                            <Routes>
                              <Route path="ajouter" element={<Ajoutez />} />
                              <Route path="commande" element={<Commande />} />
                              <Route path="statistiques" element={<StatistiquesCommandes />} />
                              <Route path="messages" element={<Messages />} />
                              <Route path="marque" element={<MarqueAdmin />} />
                            </Routes>
                          </Suspense>
                        </Box>
                      </Box>
                    </ProtectedRouteWrapper>
                  }
                />
                <Route path="/app" element={<Loginside />} />
                <Route path="*" element={
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h1 style={{ fontSize: '3rem', color: '#FF4D4F' }}>404 - Page Non Trouvée</h1>
                    <p style={{ fontSize: '1.5rem', color: '#555' }}>
                      La page que vous recherchez n'existe pas ou a été déplacée.
                    </p>
                  </div>
                }/>
              </Routes>
            </Suspense>
            {!isAppRoute && <Footer />}
          </AppContainer>
        </>
      </DataProvider>
    </CartProvider>
  );
};

export default App;
