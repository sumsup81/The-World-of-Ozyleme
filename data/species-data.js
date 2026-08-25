/* =========================================================
   OZYLEME SPECIES DATA
   =========================================================

   This file contains the editable information for every
   playable species in Ozyleme.

   Most future species changes should happen HERE.

   Do not worry about species.html yet.
   ========================================================= */


const species = [


    /* =====================================================
       AASIMAR
       ===================================================== */

    {
        id: "aasimar",

        name: "Aasimar",

        cardTitle: "The Aasimar",

        summary:
            "Rare beings touched by powers that stand apart from much of Ozyleme.",

        equivalent:
            "Aasimar",

        creatureType:
            "Humanoid",

        size:
            "Small or Medium",

        speed:
            "30 feet",

        kingdoms:
            "Rare throughout Ozyleme",

        rarity:
            "Very Rare",

        introduction:
            `Aasimar are rare within Ozyleme. Their connection to divine forces makes them unusual even among the strange peoples who live beneath the hollow sun.`,

        origins:
            `The complete history of the Aasimar of Ozyleme will be recorded here.`,

        appearance:
            `Appearance information will be added here.`,

        life:
            `Information about the lives, cultures, and treatment of Aasimar within Ozyleme will be added here.`,

        traits: [
            {
                name: "Standard Rules",
                text:
                    "Use the normal Aasimar species rules unless an Ozyleme change is listed below."
            }
        ],

        variations: [],

        changes: [
            "Ozyleme-specific Aasimar lore is still being developed."
        ]
    },


    /* =====================================================
       DRAGON FORGED
       ===================================================== */

    {
        id: "dragon-forged",

        name: "Dragon Forged",

        cardTitle: "The Dragon Forged",

        summary:
            "Metallic beings created by the High Elves as guardians, servants, and weapons.",

        equivalent:
            "Dragonborn",

        creatureType:
            "Construct",

        size:
            "Medium",

        speed:
            "30 feet",

        kingdoms:
            "Most strongly associated with Torch",

        rarity:
            "Uncommon",

        introduction:
            `The Dragon Forged replace the Dragonborn normally found in other Dungeons & Dragons settings.`,

        origins:
            `Dragon Forged were created by the High Elves. They were fashioned from metal and magic to serve as guardians, servants, and weapons.`,

        appearance:
            `Dragon Forged possess draconic forms constructed from metal rather than ordinary flesh.`,

        life:
            `Some Dragon Forged continue to serve the purposes for which they were created. Others have gained independence and now travel the kingdoms of Ozyleme.`,

        traits: [
            {
                name: "Metallic Heritage",
                text:
                    "Dragon Forged use metallic draconic ancestries."
            },

            {
                name: "Constructed Being",
                text:
                    "Dragon Forged count as Constructs rather than ordinary Humanoids."
            },

            {
                name: "Integrated Protection",
                text:
                    "A Dragon Forged may choose the Ozyleme defensive option associated with its metallic construction."
            },

            {
                name: "Breath Weapon",
                text:
                    "Dragon Forged retain the breath weapon associated with their draconic heritage."
            }
        ],

        variations: [],

        changes: [
            "Dragon Forged replace Dragonborn in Ozyleme.",
            "They are metallic creations rather than naturally born dragon people.",
            "Only metallic draconic ancestries are normally available.",
            "Their defensive rules can be updated here as the Ozyleme rules are finalized."
        ]
    },


    /* =====================================================
       DWARVES
       ===================================================== */

    {
        id: "dwarves",

        name: "Dwarves",

        cardTitle: "The Dwarves",

        summary:
            "An ancient people said to have helped build the world itself.",

        equivalent:
            "Dwarf",

        creatureType:
            "Humanoid",

        size:
            "Medium",

        speed:
            "30 feet",

        kingdoms:
            "Various",

        rarity:
            "Common",

        introduction:
            `Dwarves are among the ancient peoples of Ozyleme.`,

        origins:
            `Tradition holds that the Dwarves helped build portions of the world itself.`,

        appearance:
            `Additional information will be added here.`,

        life:
            `Dwarven cultures, settlements, and traditions will be expanded here.`,

        traits: [
            {
                name: "Standard Rules",
                text:
                    "Use the standard Dwarf species rules unless an Ozyleme change is listed below."
            }
        ],

        variations: [],

        changes: [
            "Ozyleme-specific Dwarf lore and rules can be expanded here."
        ]
    },


    /* =====================================================
       ELVES
       ===================================================== */

    {
        id: "elves",

        name: "Elves",

        cardTitle: "The Elves",

        summary:
            "Ancient peoples divided among cultures with very different histories and purposes.",

        equivalent:
            "Elf",

        creatureType:
            "Humanoid",

        size:
            "Medium",

        speed:
            "30 feet",

        kingdoms:
            "Varies by lineage",

        rarity:
            "Common",

        introduction:
            `Elves are not a single culture within Ozyleme. Several ancient peoples share an elven ancestry but developed in dramatically different ways.`,

        origins:
            `The origins of the Elves and their divisions will be described here as the history of Ozyleme is expanded.`,

        appearance:
            `Elven appearance varies considerably between their different peoples and cultures.`,

        life:
            `An Elf's home and way of life often depends upon which of the major elven peoples they belong to.`,

        traits: [
            {
                name: "Elven Traits",
                text:
                    "Use the normal core Elf traits unless an Ozyleme rule specifically replaces one."
            }
        ],

        variations: [

            {
                name: "High Elf",

                equivalent:
                    "High Elf",

                description:
                    `High Elves are strongly associated with Torch. Their culture is wealthy, magically advanced, and heavily dependent upon invention and arcane technology.`,

                mechanics:
                    "Use the High Elf lineage as the mechanical starting point."
            },

            {
                name: "Forest Elf",

                equivalent:
                    "Wood Elf",

                description:
                    `Forest Elves are the Ozyleme equivalent of Wood Elves. Their cultures are tied to the forests of the world, but they should not be assumed to be peaceful or benevolent.`,

                mechanics:
                    "Use the Wood Elf lineage as the mechanical starting point."
            },

            {
                name: "[Drow Name TBD]",

                equivalent:
                    "Drow",

                description:
                    `This people replace the traditional Drow within Ozyleme. They will receive an Ozyleme name, history, culture, and origin rather than using traditional Drow lore.`,

                mechanics:
                    "Use the Drow lineage as the mechanical starting point unless later Ozyleme rules change it."
            }
        ],

        changes: [
            "High Elf remains a recognized elven variation.",
            "Wood Elves are called Forest Elves in Ozyleme.",
            "The Drow equivalent will receive a new Ozyleme name.",
            "The Drow equivalent will use Ozyleme-specific lore rather than traditional Drow lore."
        ]
    },


    /* =====================================================
       GNOMES
       ===================================================== */

    {
        id: "gnomes",

        name: "Gnomes",

        cardTitle: "The Gnomes",

        summary:
            "Inventors, experimenters, trap-makers, and obsessive creators of strange things.",

        equivalent:
            "Gnome",

        creatureType:
            "Humanoid",

        size:
            "Small",

        speed:
            "30 feet",

        kingdoms:
            "Scattered colonies",

        rarity:
            "Uncommon",

        introduction:
            `Gnomes are relentless inventors and experimenters.`,

        origins:
            `Gnomes are credited with numerous strange crafts, inventions, and dangerous experiments throughout the history of Ozyleme.`,

        appearance:
            `Additional information will be added here.`,

        life:
            `Some Gnomes live in isolated colonies while others travel Ozyleme pursuing their particular craft or obsession.`,

        traits: [
            {
                name: "Standard Rules",
                text:
                    "Use the standard Gnome species rules unless an Ozyleme change is listed below."
            }
        ],

        variations: [],

        changes: [
            "Ozyleme-specific Gnome rules can be added here."
        ]
    },


    /* =====================================================
       GOLIATHS
       ===================================================== */

    {
        id: "goliaths",

        name: "Goliaths",

        cardTitle: "The Goliaths",

        summary:
            "A hardy people strongly associated with the farms and settlements of Vial.",

        equivalent:
            "Goliath",

        creatureType:
            "Humanoid",

        size:
            "Medium",

        speed:
            "35 feet",

        kingdoms:
            "Vial",

        rarity:
            "Common",

        introduction:
            `Goliaths are a hardy people with a strong presence throughout the Kingdom of Vial.`,

        origins:
            `Their complete history within Ozyleme will be recorded here.`,

        appearance:
            `Additional information will be added here.`,

        life:
            `Many Goliaths of Vial are associated with farming, rural communities, and the demanding physical life of the kingdom.`,

        traits: [
            {
                name: "Standard Rules",
                text:
                    "Use the standard Goliath species rules unless an Ozyleme change is listed below."
            }
        ],

        variations: [],

        changes: [
            "Ozyleme-specific Goliath lore can be expanded here."
        ]
    },


    /* =====================================================
       HALFLINGS
       ===================================================== */

    {
        id: "halflings",

        name: "Halflings",

        cardTitle: "The Halflings",

        summary:
            "Small folk whose cultures include the feral communities of Crook.",

        equivalent:
            "Halfling",

        creatureType:
            "Humanoid",

        size:
            "Small",

        speed:
            "30 feet",

        kingdoms:
            "Crook and elsewhere",

        rarity:
            "Common",

        introduction:
            `Halflings can be found in several parts of Ozyleme, though some of their most infamous communities exist within Crook.`,

        origins:
            `Additional Halfling history will be added here.`,

        appearance:
            `Additional information will be added here.`,

        life:
            `The Halflings of Crook include feral communities whose customs can differ greatly from Halflings found elsewhere.`,

        traits: [
            {
                name: "Standard Rules",
                text:
                    "Use the standard Halfling species rules unless an Ozyleme change is listed below."
            }
        ],

        variations: [],

        changes: [
            "Additional Halfling cultures and variations can be added here later."
        ]
    },


    /* =====================================================
       HUMANS
       ===================================================== */

    {
        id: "humans",

        name: "Humans",

        cardTitle: "The Humans",

        summary:
            "Numerous, adaptable, and scattered throughout the kingdoms of Ozyleme.",

        equivalent:
            "Human",

        creatureType:
            "Humanoid",

        size:
            "Small or Medium",

        speed:
            "30 feet",

        kingdoms:
            "Throughout Ozyleme",

        rarity:
            "Common",

        introduction:
            `Humans are numerous and culturally diverse throughout Ozyleme.`,

        origins:
            `The history of humanity within Ozyleme will be expanded here.`,

        appearance:
            `Humans vary greatly in appearance.`,

        life:
            `Human cultures differ considerably between the kingdoms in which they live.`,

        traits: [
            {
                name: "Standard Rules",
                text:
                    "Use the standard Human species rules unless an Ozyleme change is listed below."
            }
        ],

        variations: [],

        changes: [
            "No major Ozyleme mechanical changes are currently recorded."
        ]
    },


    /* =====================================================
       ORCS
       ===================================================== */

    {
        id: "orcs",

        name: "Orcs",

        cardTitle: "The Orcs",

        summary:
            "An Umbral people once known for their ancient connection to the sea.",

        equivalent:
            "Orc",

        creatureType:
            "Humanoid",

        size:
            "Medium",

        speed:
            "30 feet",

        kingdoms:
            "Hook and Vial",

        rarity:
            "Uncommon",

        introduction:
            `Orcs are counted among the Umbral Folk of Ozyleme.`,

        origins:
            `Orcs were once considered a people of the sea. Their ancient history remains connected to the waters surrounding Ozyleme.`,

        appearance:
            `Additional information will be added here.`,

        life:
            `Today Orc tribes can be found along the coasts of Hook and within portions of the forests of Vial.`,

        traits: [
            {
                name: "Standard Rules",
                text:
                    "Use the standard Orc species rules unless an Ozyleme change is listed below."
            }
        ],

        variations: [],

        changes: [
            "Orcs are classified among the Umbral Folk in Ozyleme.",
            "Their cultural history is tied to the sea rather than traditional D&D Orc lore."
        ]
    },


    /* =====================================================
       TIEFLINGS
       ===================================================== */

    {
        id: "tieflings",

        name: "Tieflings",

        cardTitle: "The Tieflings",

        summary:
            "Mortals marked by strange inheritances and powers beyond ordinary flesh.",

        equivalent:
            "Tiefling",

        creatureType:
            "Humanoid",

        size:
            "Small or Medium",

        speed:
            "30 feet",

        kingdoms:
            "Various",

        rarity:
            "Uncommon",

        introduction:
            `Tieflings exist within Ozyleme, though their origins need not mirror those found in other worlds.`,

        origins:
            `Ozyleme Tiefling origins will be expanded here.`,

        appearance:
            `Additional information will be added here.`,

        life:
            `Additional information will be added here.`,

        traits: [
            {
                name: "Standard Rules",
                text:
                    "Use the standard Tiefling species rules unless an Ozyleme change is listed below."
            }
        ],

        variations: [],

        changes: [
            "Ozyleme-specific Tiefling origins are still being developed."
        ]
    },


    /* =====================================================
       SHIFTERS
       ===================================================== */

    {
        id: "shifters",

        name: "Shifters",

        cardTitle: "The Shifters",

        summary:
            "Changed beings whose bodies retain an unstable connection to something more primal.",

        equivalent:
            "Shifter",

        creatureType:
            "Humanoid",

        size:
            "Medium",

        speed:
            "30 feet",

        kingdoms:
            "Various",

        rarity:
            "Uncommon",

        introduction:
            `Shifters are beings altered by forces that leave something unstable and primal within them.`,

        origins:
            `Their complete Ozyleme origin will be recorded here.`,

        appearance:
            `Additional information will be added here.`,

        life:
            `Additional information will be added here.`,

        traits: [
            {
                name: "Rules",
                text:
                    "Ozyleme Shifter rules will be finalized here."
            }
        ],

        variations: [],

        changes: [
            "Shifter lore and mechanical variations are still being developed."
        ]
    },


    /* =====================================================
       HEXBLOOD
       ===================================================== */

    {
        id: "hexblood",

        name: "Hexblood",

        cardTitle: "The Hexblood",

        summary:
            "People altered by bargains, curses, strange magic, or forces that reshape mortal life.",

        equivalent:
            "Hexblood",

        creatureType:
            "Humanoid",

        size:
            "Small or Medium",

        speed:
            "30 feet",

        kingdoms:
            "Various",

        rarity:
            "Rare",

        introduction:
            `Hexblood are people transformed by magic, bargains, curses, or other unnatural forces.`,

        origins:
            `Their exact origins may differ greatly from one Hexblood to another.`,

        appearance:
            `Additional information will be added here.`,

        life:
            `Additional information will be added here.`,

        traits: [
            {
                name: "Rules",
                text:
                    "Hexblood rules and Ozyleme-specific changes will be recorded here."
            }
        ],

        variations: [],

        changes: [
            "Ozyleme-specific Hexblood lore is still being developed."
        ]
    },


    /* =====================================================
       REBORN
       ===================================================== */

    {
        id: "reborn",

        name: "Reborn",

        cardTitle: "The Reborn",

        summary:
            "Those who returned after death when the Essence of Experience failed to fully depart.",

        equivalent:
            "Reborn",

        creatureType:
            "Humanoid",

        size:
            "Small or Medium",

        speed:
            "30 feet",

        kingdoms:
            "Anywhere",

        rarity:
            "Rare",

        introduction:
            `Death does not always bring a perfect ending beneath the hollow sun.`,

        origins:
            `When a creature dies, its Essence of Experience does not always fully depart. Sometimes lingering echoes return to the body.`,

        appearance:
            `A Reborn may resemble the person whose body it inhabits, though signs of death or transformation may remain.`,

        life:
            `What awakens may remember pieces of the person who died, but the being that returns is not truly the same person.`,

        traits: [
            {
                name: "Rules",
                text:
                    "Use Reborn rules as the mechanical foundation unless an Ozyleme rule replaces them."
            }
        ],

        variations: [],

        changes: [
            "Rebirth is connected to the Essence of Experience.",
            "The returned being is not necessarily the same consciousness or soul that originally inhabited the body."
        ]
    },


    /* =====================================================
       OTHERS
       ===================================================== */

    {
        id: "others",

        name: "Others",

        cardTitle: "The Others",

        summary:
            "Rare, foreign, forgotten, or unexplained peoples who do not fit neatly among the known species.",

        equivalent:
            "Varies",

        creatureType:
            "Varies",

        size:
            "Varies",

        speed:
            "Varies",

        kingdoms:
            "Anywhere",

        rarity:
            "Exceptional",

        introduction:
            `Not every creature found beneath the hollow sun fits neatly into the commonly recognized peoples of Ozyleme.`,

        origins:
            `Rare bloodlines, travelers from impossible places, forgotten creations, strange transformations, and other exceptional beings may appear.`,

        appearance:
            `Varies.`,

        life:
            `Characters using unusual species should be discussed with the Dungeon Master so their origin can be properly placed within Ozyleme.`,

        traits: [],

        variations: [],

        changes: [
            "This category allows unusual or future species to exist without immediately adding them to the primary species list."
        ]
    }

];