/* =========================================================
   OZYLEME MONSTER DATABASE
   =========================================================

   Base Creature Data:
   Dungeons & Dragons SRD 5.2.1

   SRD 5.2.1 is licensed under:
   Creative Commons Attribution 4.0 International

   https://creativecommons.org/licenses/by/4.0/

   This file loads the SRD monster database and converts it
   into the lightweight format used by Ozyleme DM Tools.

   ========================================================= */


(function () {

    "use strict";


    /* =====================================================
       DATABASE SOURCE
       ===================================================== */

    const MONSTER_DATABASE_URL =
        "https://raw.githubusercontent.com/rschaeff/srd/refs/heads/master/monsters.json";


    /* =====================================================
       LOCAL CACHE

       This prevents the browser from downloading all of the
       monster data every time the DM Tools page opens.
       ===================================================== */

    const CACHE_KEY =
        "ozyleme_srd521_monsters_v1";


    const CACHE_TIME_KEY =
        "ozyleme_srd521_monsters_v1_time";


    const CACHE_MAX_AGE =
        7 * 24 * 60 * 60 * 1000;


    /* =====================================================
       DATABASE INFORMATION
       ===================================================== */

    window.OZYLEME_MONSTER_DATABASE_INFO = {

        name:
            "Ozyleme Monster Database",

        rules:
            "D&D 5.5e / 2024",

        source:
            "SRD 5.2.1",

        license:
            "CC BY 4.0",

        expectedCreatureCount:
            330

    };


    /* =====================================================
       ACTIVE MONSTER ARRAY

       dm-tools.html will eventually read from this.
       ===================================================== */

    window.OZYLEME_MONSTERS = [];


    /* =====================================================
       NORMALIZE MONSTER

       The original SRD data contains complete stat blocks.

       The encounter calculator does NOT need all of that.

       We keep only:

       name
       type
       size
       CR
       XP
       source
       ===================================================== */

    function normalizeMonster(monster) {


        const crDisplay =

            monster.cr_string !== undefined

                ? String(monster.cr_string)

                : String(monster.cr ?? "0");



        const crNumber =

            Number(monster.cr) || 0;



        const xp =

            Number(monster.xp) || 0;



        return {

            name:
                monster.name || "Unknown Creature",

            type:
                monster.type || "Unknown",

            size:
                monster.size || "Unknown",

            cr:
                crDisplay,

            crNumber:
                crNumber,

            xp:
                xp,

            source:
                "SRD 5.2.1",

            sourceType:
                "srd"

        };

    }


    /* =====================================================
       SORT MONSTERS
       ===================================================== */

    function sortMonsters(monsters) {

        return monsters.sort(

            (a, b) =>

                a.name.localeCompare(
                    b.name,
                    "en",
                    {
                        sensitivity: "base"
                    }
                )

        );

    }


    /* =====================================================
       READ CACHE
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
                !savedData ||
                !savedTime
            ) {

                return null;

            }


            const age =
                Date.now() - savedTime;


            if (
                age > CACHE_MAX_AGE
            ) {

                return null;

            }


            const parsed =
                JSON.parse(
                    savedData
                );


            if (
                !Array.isArray(parsed)
            ) {

                return null;

            }


            return parsed;


        }

        catch (error) {


            console.warn(
                "Ozyleme monster cache could not be read.",
                error
            );


            return null;

        }

    }


    /* =====================================================
       SAVE CACHE
       ===================================================== */

    function saveCache(monsters) {


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

        catch (error) {


            console.warn(
                "Ozyleme monster database could not be cached.",
                error
            );

        }

    }


    /* =====================================================
       LOAD DATABASE
       ===================================================== */

    async function loadMonsterDatabase() {


        /* -----------------------------------------
           TRY CACHE FIRST
           ----------------------------------------- */

        const cachedMonsters =
            readCache();


        if (
            cachedMonsters &&
            cachedMonsters.length > 0
        ) {


            window.OZYLEME_MONSTERS =
                cachedMonsters;


            console.log(

                `Ozyleme Monster Database loaded ` +
                `${cachedMonsters.length} creatures from cache.`

            );


            return cachedMonsters;

        }



        /* -----------------------------------------
           DOWNLOAD SRD DATABASE
           ----------------------------------------- */

        const response =
            await fetch(
                MONSTER_DATABASE_URL
            );


        if (
            !response.ok
        ) {


            throw new Error(

                "Monster database request failed: " +
                response.status

            );

        }



        const rawMonsters =
            await response.json();



        if (
            !Array.isArray(rawMonsters)
        ) {


            throw new Error(
                "Monster database did not contain a valid creature list."
            );

        }



        /* -----------------------------------------
           CONVERT TO OZYLEME FORMAT
           ----------------------------------------- */

        const monsters =

            sortMonsters(

                rawMonsters
                    .filter(
                        monster =>
                            monster &&
                            monster.name
                    )
                    .map(
                        normalizeMonster
                    )

            );



        /* -----------------------------------------
           STORE DATABASE
           ----------------------------------------- */

        window.OZYLEME_MONSTERS =
            monsters;


        saveCache(
            monsters
        );



        console.log(

            `Ozyleme Monster Database loaded ` +
            `${monsters.length} creatures.`

        );


        return monsters;

    }


    /* =====================================================
       DATABASE READY PROMISE

       dm-tools.html can wait for this before showing the
       monster picker.

       Example:

       await window.OZYLEME_MONSTERS_READY;
       ===================================================== */

    window.OZYLEME_MONSTERS_READY =

        loadMonsterDatabase()

            .then(monsters => {


                /* ---------------------------------
                   TELL OTHER TOOLS DATABASE IS READY
                   --------------------------------- */

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

            })

            .catch(error => {


                console.error(
                    "Ozyleme Monster Database failed to load.",
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

            });



    /* =====================================================
       HELPER: GET ALL MONSTERS
       ===================================================== */

    window.getOzylemeMonsters = function () {

        return [
            ...window.OZYLEME_MONSTERS
        ];

    };


    /* =====================================================
       HELPER: SEARCH MONSTERS
       ===================================================== */

    window.searchOzylemeMonsters =
        function (searchText) {


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
                .filter(monster => {


                    return (

                        monster.name
                            .toLowerCase()
                            .includes(search)

                        ||

                        monster.type
                            .toLowerCase()
                            .includes(search)

                        ||

                        monster.cr
                            .toLowerCase()
                            .includes(search)

                    );

                });

        };


    /* =====================================================
       HELPER: FILTER BY CR
       ===================================================== */

    window.getOzylemeMonstersByCR =
        function (cr) {


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
       HELPER: FILTER BY TYPE
       ===================================================== */

    window.getOzylemeMonstersByType =
        function (type) {


            const requestedType =

                String(
                    type || ""
                )

                    .toLowerCase();



            return window
                .OZYLEME_MONSTERS
                .filter(

                    monster =>

                        monster.type
                            .toLowerCase() ===
                        requestedType

                );

        };


})();