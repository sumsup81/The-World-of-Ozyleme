/* =========================================================
   OZYLEME MONSTER DATABASE
   Version 2

   Sources:
   - Open5e API V2
   - Openly licensed 5e-compatible material
   - Local Ozyleme creatures

   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       EASY CONFIG
       ===================================================== */

    const OPEN5E_API =
        "https://api.open5e.com/v2/creatures/";

    const OPEN5E_PAGE_SIZE =
        500;

    const CACHE_KEY =
        "ozyleme_open5e_monsters_v2";

    const CACHE_TIME_KEY =
        "ozyleme_open5e_monsters_v2_time";

    const CACHE_MAX_AGE =
        24 * 60 * 60 * 1000;


    /* =====================================================
       LOCAL OZYLEME CREATURES

       Later we can permanently add your custom Ozyleme
       monsters here.
       ===================================================== */

    const OZYLEME_LOCAL_MONSTERS = [

        /* Example:

        {
            name: "Feral Halfling",
            cr: "1/4",
            type: "Humanoid",
            size: "Small",
            source: "Ozyleme",
            ruleset: "5.5e / 2024"
        }

        */

    ];


    /* =====================================================
       XP BY CHALLENGE RATING
       ===================================================== */

    const XP_BY_CR = {

        "0": 10,
        "1/8": 25,
        "1/4": 50,
        "1/2": 100,

        "1": 200,
        "2": 450,
        "3": 700,
        "4": 1100,
        "5": 1800,
        "6": 2300,
        "7": 2900,
        "8": 3900,
        "9": 5000,
        "10": 5900,
        "11": 7200,
        "12": 8400,
        "13": 10000,
        "14": 11500,
        "15": 13000,
        "16": 15000,
        "17": 18000,
        "18": 20000,
        "19": 22000,
        "20": 25000,
        "21": 33000,
        "22": 41000,
        "23": 50000,
        "24": 62000,
        "25": 75000,
        "26": 90000,
        "27": 105000,
        "28": 120000,
        "29": 135000,
        "30": 155000

    };


    /* =====================================================
       DATABASE INFORMATION
       ===================================================== */

    window.OZYLEME_MONSTER_DATABASE_INFO = {

        name:
            "Ozyleme Monster Archive",

        api:
            "Open5e API V2",

        includes: [

            "SRD 5.2 / 2024",

            "SRD 5.1 / 2014",

            "Openly licensed third-party 5e-compatible creatures",

            "Ozyleme creatures"

        ],

        databaseVersion:
            2

    };


    window.OZYLEME_MONSTERS = [];


    /* =====================================================
       CLEAN TEXT
       ===================================================== */

    function cleanText(
        value,
        fallback = "Unknown"
    ) {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {

            return fallback;

        }


        if (
            Array.isArray(value)
        ) {

            return value.join(", ");

        }


        if (
            typeof value === "object"
        ) {

            return String(

                value.name ??
                value.label ??
                value.value ??
                fallback

            );

        }


        return String(value);

    }


    /* =====================================================
       CHALLENGE RATING
       ===================================================== */

    function normalizeCR(
        monster
    ) {

        const raw =

            monster.challenge_rating ??

            monster.cr ??

            monster.cr_string ??

            0;


        if (
            typeof raw === "object" &&
            raw !== null
        ) {

            const display =

                raw.rating ??

                raw.name ??

                raw.label ??

                raw.value ??

                raw.challenge_rating ??

                "0";


            const decimal =

                raw.decimal ??

                raw.decimal_value ??

                raw.value_decimal ??

                monster.challenge_rating_decimal;


            return {

                display:
                    String(display),

                number:
                    crToNumber(
                        display,
                        decimal
                    )

            };

        }


        return {

            display:
                String(raw),

            number:
                crToNumber(
                    raw,
                    monster.challenge_rating_decimal
                )

        };

    }


    function crToNumber(
        display,
        decimalFallback
    ) {

        const fallback =
            Number(decimalFallback);


        if (
            Number.isFinite(fallback)
        ) {

            return fallback;

        }


        const text =
            String(display).trim();


        if (
            text.includes("/")
        ) {

            const parts =
                text.split("/");


            const numerator =
                Number(parts[0]);


            const denominator =
                Number(parts[1]);


            if (
                Number.isFinite(numerator) &&
                Number.isFinite(denominator) &&
                denominator !== 0
            ) {

                return (
                    numerator /
                    denominator
                );

            }

        }


        const number =
            Number(text);


        return Number.isFinite(number)

            ? number

            : 0;

    }


    /* =====================================================
       XP
       ===================================================== */

    function getXPForCR(
        crDisplay,
        monster = {}
    ) {

        const possibleApiXP =

            monster.experience_points ??

            monster.xp ??

            monster.challenge_rating?.xp;


        const apiXP =
            Number(possibleApiXP);


        if (
            Number.isFinite(apiXP) &&
            apiXP >= 0
        ) {

            return apiXP;

        }


        return (
            XP_BY_CR[String(crDisplay)] ??
            0
        );

    }


    /* =====================================================
       SOURCE INFORMATION
       ===================================================== */

    function getDocumentInfo(
        monster
    ) {

        const document =
            monster.document || {};


        const sourceKey =
            cleanText(

                document.key ??

                monster.document__key,

                "unknown-source"

            );


        const sourceName =
            cleanText(

                document.name ??

                document.title ??

                sourceKey,

                sourceKey

            );


        return {

            key:
                sourceKey,

            name:
                sourceName

        };

    }


    /* =====================================================
       IDENTIFY RULESET
       ===================================================== */

    function inferRuleset(
        sourceKey,
        sourceName
    ) {

        const key =
            String(sourceKey)
                .toLowerCase();


        const name =
            String(sourceName)
                .toLowerCase();


        /* 2024 / 5.5E */

        if (

            key === "srd-2024"

            ||

            name.includes(
                "system reference document 5.2"
            )

            ||

            name.includes(
                "srd 5.2"
            )

        ) {

            return "5.5e / 2024";

        }


        /* 2014 / 5E */

        if (

            key === "srd-2014"

            ||

            name.includes(
                "system reference document 5.1"
            )

            ||

            name.includes(
                "srd 5.1"
            )

        ) {

            return "5e / 2014";

        }


        /* THIRD PARTY */

        return (
            "5e-Compatible / Third Party"
        );

    }


    /* =====================================================
       NORMALIZE OPEN5E CREATURE
       ===================================================== */

    function normalizeOpen5eMonster(
        monster
    ) {

        const cr =
            normalizeCR(monster);


        const document =
            getDocumentInfo(monster);


        return {

            id:

                `open5e:${document.key}:`

                +

                cleanText(
                    monster.key,
                    monster.name
                ),


            key:

                cleanText(
                    monster.key,
                    monster.name
                ),


            /* DATABASE NAME */

            name:

                cleanText(
                    monster.name,
                    "Unknown Creature"
                ),


            /* ORIGINAL STAT BLOCK NAME */

            baseName:

                cleanText(
                    monster.name,
                    "Unknown Creature"
                ),


            type:

                cleanText(
                    monster.type
                ),


            size:

                cleanText(
                    monster.size
                ),


            cr:

                cr.display,


            crNumber:

                cr.number,


            xp:

                getXPForCR(
                    cr.display,
                    monster
                ),


            source:

                document.name,


            sourceKey:

                document.key,


            sourceType:

                "open5e",


            ruleset:

                inferRuleset(

                    document.key,

                    document.name

                ),


            /* =================================
               ENCOUNTER CUSTOMIZATION

               These are intentionally included
               now for our later encounter tools.
               ================================= */

            customName:

                "",


            note:

                ""

        };

    }


    /* =====================================================
       NORMALIZE OZYLEME CREATURE
       ===================================================== */

    function normalizeLocalMonster(
        monster,
        index
    ) {

        const crDisplay =
            String(
                monster.cr ??
                "0"
            );


        return {

            id:

                monster.id ||

                `ozyleme:${index}:${monster.name}`,


            key:

                monster.key ||

                `ozyleme-${index}`,


            name:

                cleanText(
                    monster.name,
                    "Ozyleme Creature"
                ),


            baseName:

                cleanText(

                    monster.baseName ??

                    monster.name,

                    "Ozyleme Creature"

                ),


            type:

                cleanText(
                    monster.type
                ),


            size:

                cleanText(
                    monster.size
                ),


            cr:

                crDisplay,


            crNumber:

                crToNumber(
                    crDisplay
                ),


            xp:

                Number(
                    monster.xp
                )

                ||

                XP_BY_CR[
                    crDisplay
                ]

                ||

                0,


            source:

                cleanText(
                    monster.source,
                    "Ozyleme"
                ),


            sourceKey:

                "ozyleme",


            sourceType:

                "ozyleme",


            ruleset:

                cleanText(

                    monster.ruleset,

                    "5.5e / 2024"

                ),


            customName:

                monster.customName || "",


            note:

                monster.note || ""

        };

    }


    /* =====================================================
       SORTING

       2024 creatures appear first.
       ===================================================== */

    function sourcePriority(
        monster
    ) {

        if (
            monster.ruleset ===
            "5.5e / 2024"
        ) {

            return 0;

        }


        if (
            monster.sourceType ===
            "ozyleme"
        ) {

            return 1;

        }


        if (
            monster.ruleset ===
            "5e / 2014"
        ) {

            return 2;

        }


        return 3;

    }


    function sortMonsters(
        monsters
    ) {

        return monsters.sort(
            (a, b) => {


                const priorityDifference =

                    sourcePriority(a)

                    -

                    sourcePriority(b);


                if (
                    priorityDifference !== 0
                ) {

                    return (
                        priorityDifference
                    );

                }


                return a.name.localeCompare(

                    b.name,

                    "en",

                    {
                        sensitivity:
                            "base"
                    }

                );

            }
        );

    }


    /* =====================================================
       CACHE
       ===================================================== */

    function readCache() {

        try {

            const savedData =

                localStorage.getItem(
                    CACHE_KEY
                );


            const savedTime =

                Number(

                    localStorage.getItem(
                        CACHE_TIME_KEY
                    )

                );


            if (

                !savedData

                ||

                !savedTime

                ||

                Date.now() - savedTime >
                CACHE_MAX_AGE

            ) {

                return null;

            }


            const parsed =
                JSON.parse(
                    savedData
                );


            return Array.isArray(parsed)

                ? parsed

                : null;

        }


        catch (
            error
        ) {

            console.warn(

                "Ozyleme monster cache could not be read.",

                error

            );


            return null;

        }

    }


    function saveCache(
        monsters
    ) {

        try {

            localStorage.setItem(

                CACHE_KEY,

                JSON.stringify(
                    monsters
                )

            );


            localStorage.setItem(

                CACHE_TIME_KEY,

                String(
                    Date.now()
                )

            );

        }


        catch (
            error
        ) {

            console.warn(

                "Ozyleme monster database could not be cached.",

                error

            );

        }

    }


    /* =====================================================
       DOWNLOAD OPEN5E CREATURES

       Open5e paginates results, so this follows each
       page until the entire available archive is loaded.
       ===================================================== */

    async function fetchOpen5eCreatures() {

        const creatures =
            [];


        let nextUrl =

            `${OPEN5E_API}`

            +

            `?limit=${OPEN5E_PAGE_SIZE}`

            +

            `&fields=name,key,size,type,challenge_rating,document`

            +

            `&document__fields=name,key`

            +

            `&ordering=name`;


        let safetyCounter =
            0;


        while (
            nextUrl &&
            safetyCounter < 100
        ) {

            safetyCounter +=
                1;


            const response =
                await fetch(
                    nextUrl
                );


            if (
                !response.ok
            ) {

                throw new Error(

                    "Open5e request failed with HTTP "

                    +

                    response.status

                    +

                    "."

                );

            }


            const payload =
                await response.json();


            const pageResults =

                Array.isArray(payload)

                    ? payload

                    : payload.results;


            if (
                !Array.isArray(
                    pageResults
                )
            ) {

                throw new Error(

                    "Open5e returned an unexpected creature response."

                );

            }


            creatures.push(
                ...pageResults
            );


            if (
                Array.isArray(payload)
            ) {

                nextUrl =
                    null;

            }

            else {

                nextUrl =
                    payload.next ||
                    null;

            }

        }


        return creatures;

    }


    /* =====================================================
       LOAD COMPLETE DATABASE
       ===================================================== */

    async function loadMonsterDatabase() {


        /* -----------------------------------------
           CHECK CACHE
           ----------------------------------------- */

        const cached =
            readCache();


        if (
            cached &&
            cached.length > 0
        ) {

            window.OZYLEME_MONSTERS =
                cached;


            console.log(

                `Ozyleme Monster Archive loaded `

                +

                `${cached.length} creatures from cache.`

            );


            return cached;

        }


        /* -----------------------------------------
           LOAD OPEN5E
           ----------------------------------------- */

        const rawOpen5e =
            await fetchOpen5eCreatures();


        const open5eMonsters =

            rawOpen5e

                .filter(

                    monster =>

                        monster &&

                        monster.name

                )

                .map(
                    normalizeOpen5eMonster
                );


        /* -----------------------------------------
           LOAD OZYLEME
           ----------------------------------------- */

        const localMonsters =

            OZYLEME_LOCAL_MONSTERS.map(
                normalizeLocalMonster
            );


        /* -----------------------------------------
           MERGE
           ----------------------------------------- */

        const monsters =

            sortMonsters([

                ...open5eMonsters,

                ...localMonsters

            ]);


        window.OZYLEME_MONSTERS =
            monsters;


        saveCache(
            monsters
        );


        console.log(

            `Ozyleme Monster Archive loaded `

            +

            `${monsters.length} creatures.`

        );


        return monsters;

    }


    /* =====================================================
       DATABASE READY
       ===================================================== */

    window.OZYLEME_MONSTERS_READY =

        loadMonsterDatabase()

            .then(
                monsters => {


                    window.dispatchEvent(

                        new CustomEvent(

                            "ozyleme-monsters-ready",

                            {

                                detail: {

                                    monsters:
                                        monsters

                                }

                            }

                        )

                    );


                    return monsters;

                }
            )

            .catch(
                error => {


                    console.error(

                        "Ozyleme Monster Archive failed to load.",

                        error

                    );


                    window.OZYLEME_MONSTERS =
                        [];


                    window.dispatchEvent(

                        new CustomEvent(

                            "ozyleme-monsters-error",

                            {

                                detail: {

                                    error:
                                        error

                                }

                            }

                        )

                    );


                    return [];

                }
            );


    /* =====================================================
       GET ALL MONSTERS
       ===================================================== */

    window.getOzylemeMonsters =
        function () {

            return [

                ...window.OZYLEME_MONSTERS

            ];

        };


    /* =====================================================
       SEARCH
       ===================================================== */

    window.searchOzylemeMonsters =
        function (
            searchText
        ) {

            const search =

                String(
                    searchText || ""
                )

                    .trim()

                    .toLowerCase();


            if (
                !search
            ) {

                return window
                    .OZYLEME_MONSTERS
                    .slice();

            }


            return window
                .OZYLEME_MONSTERS
                .filter(
                    monster => {


                        return (

                            monster.name
                                .toLowerCase()
                                .includes(
                                    search
                                )

                            ||

                            monster.type
                                .toLowerCase()
                                .includes(
                                    search
                                )

                            ||

                            monster.source
                                .toLowerCase()
                                .includes(
                                    search
                                )

                            ||

                            monster.ruleset
                                .toLowerCase()
                                .includes(
                                    search
                                )

                            ||

                            monster.cr
                                .toLowerCase()
                                .includes(
                                    search
                                )

                        );

                    }
                );

        };


    /* =====================================================
       FILTER BY CR
       ===================================================== */

    window.getOzylemeMonstersByCR =
        function (
            cr
        ) {

            const requestedCR =
                String(cr);


            return window
                .OZYLEME_MONSTERS
                .filter(

                    monster =>

                        monster.cr ===
                        requestedCR

                );

        };


    /* =====================================================
       FILTER BY SOURCE
       ===================================================== */

    window.getOzylemeMonstersBySource =
        function (
            sourceKey
        ) {

            const requestedSource =

                String(
                    sourceKey || ""
                )

                    .toLowerCase();


            return window
                .OZYLEME_MONSTERS
                .filter(

                    monster =>

                        monster.sourceKey
                            .toLowerCase()

                        ===

                        requestedSource

                );

        };


    /* =====================================================
       FILTER BY RULESET
       ===================================================== */

    window.getOzylemeMonstersByRuleset =
        function (
            ruleset
        ) {

            const requestedRuleset =

                String(
                    ruleset || ""
                )

                    .toLowerCase();


            return window
                .OZYLEME_MONSTERS
                .filter(

                    monster =>

                        monster.ruleset
                            .toLowerCase()

                        ===

                        requestedRuleset

                );

        };


    /* =====================================================
       CLEAR CACHE

       Later we can attach this to a Refresh Archive button.
       ===================================================== */

    window.clearOzylemeMonsterCache =
        function () {

            localStorage.removeItem(
                CACHE_KEY
            );


            localStorage.removeItem(
                CACHE_TIME_KEY
            );


            return true;

        };


})();