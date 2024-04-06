import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import Detail from './Detail'; // Import Detail component from the same directory

const App = () => {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
            const data = await response.json();
            const pokemonList = data.results.map((pokemon, index) => ({
                id: index + 1,
                name: pokemon.name,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                weight: Math.floor(Math.random() * 200) + 1, // Random weight between 1 and 200
                age: Math.floor(Math.random() * 30) + 1 // Random age between 1 and 30
            }));
            setPokemon(pokemonList);
        };
        fetchData();
    }, []);

    // Fetch or provide descriptions for Pokémon
    const descriptions = {
    bulbasaur: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    ivysaur: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
    venusaur: "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
    charmander: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
    charmeleon: "When it swings its burning tail, it elevates the temperature to unbearably high levels.",
    charizard: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.",
    squirtle: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.",
    wartortle: "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.",
    blastoise: "Once it takes aim at its enemy, it blasts out water with even more force than a fire hose.",
    caterpie: "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.",
    metapod: "This Pokémon is vulnerable to attack while its shell is soft, exposing its weak and tender body.",
    butterfree: "In battle, it flaps its wings at high speed to release highly toxic dust into the air.",
    weedle: "Often found in forests and grasslands. It has a sharp, toxic barb of around two inches on top of its head.",
    kakuna: "Almost incapable of moving, this Pokémon can only harden its shell to protect itself from predators.",
    beedrill: "It can take down any opponent with its powerful poison stingers. It sometimes attacks in swarms.",
    pidgey: "It usually hides in tall grass. Because it dislikes fighting, it protects itself by kicking up sand.",
    pidgeotto: "This Pokémon flies over its wide territory in search of prey, downing it with its highly developed claws.",
    pidgeot: "When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp.",
    rattata: "Will chew on anything with its fangs. If you see one, you can be certain that 40 more live in the area.",
    raticate: "Its hind feet are webbed. They act as flippers, so it can swim in rivers and hunt for prey.",
    spearow: "Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.",
    fearow: "With its huge and magnificent wings, it can keep aloft without ever having to land for rest.",
    ekans: "Moves silently and stealthily. Eats the eggs of birds, such as Pidgey and Spearow, whole.",
    arbok: "The frightening patterns on its belly have been studied. Six variations have been confirmed.",
    pikachu: "It raises its tail to check its surroundings. The tail is sometimes struck by lightning in this pose.",
    raichu: "When electricity builds up inside its body, it becomes feisty. It also glows in the dark.",
    sandshrew: "Burrows deep underground in arid locations far from water. It only emerges to hunt for food.",
    sandslash: "Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape.",
    nidoranF: "Although small, its venomous barbs render this Pokémon dangerous. The female has smaller horns.",
    nidorina: "The female's horn develops slowly. Prefers physical attacks such as clawing and biting.",
    nidoqueen: "Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves.",
    nidoranM: "Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom.",
    nidorino: "An aggressive Pokémon that is quick to attack. The horn on its head secretes a powerful venom.",
    nidoking: "It uses its powerful tail in battle to smash, constrict, then break the prey's bones.",
    clefairy: "Its magical and cute appeal has many admirers. It is rare and found only in certain areas.",
    clefable: "A timid fairy Pokémon that is rarely seen. It will run and hide the moment it senses people.",
    vulpix: "When it is born, it has just one snow-white tail. The tail splits from its tip as it grows older.",
    ninetales: "Very smart and very vengeful. Grabbing one of its many tails could result in a 1,000-year curse.",
    jigglypuff: "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.",
    wigglytuff: "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size.",
    zubat: "Emits ultrasonic cries while it flies. They act as a sonar used to check for objects in its way.",
    golbat: "It attacks in a stealthy manner, without warning. Its sharp fangs are used to bite and suck blood.",
    oddish: "During the day, it stays in the cold underground to avoid the sun. It grows by bathing in moonlight.",
    gloom: "The fluid that oozes from its mouth isn't drool. It is a nectar that is used to attract prey.",
    vileplume: "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up.",
    paras: "Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host.",
    parasect: "A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places.",
    venonat: "Lives in the shadows of tall trees where it eats bugs. It is attracted by light at night.",
    venomoth: "The powdery scales on its wings are hard to remove from skin. They also contain poison that leaks out on contact.",
    diglett: "It burrows through the ground at a shallow depth. It leaves raised earth in its wake, making it easy to spot.",
    dugtrio: "A team of Diglett triplets. It triggers huge earthquakes by burrowing 60 miles underground.",
    meowth: "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change.",
    persian: "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness.",
    psyduck: "While lulling its enemies with its vacant look, this wily Pokémon will use psychokinetic powers.",
    golduck: "Often seen swimming elegantly by lakeshores. It is often mistaken for the Japanese monster, Kappa.",
    mankey: "Extremely quick to anger. It could be docile one moment then thrashing away the next instant.",
    primeape: "Always furious and tenacious to boot. It will not abandon chasing its quarry until it is caught.",
    growlithe: "Very friendly and faithful to people. It will try to repel enemies by barking and biting.",
    arcanine: "A Pokémon that has long been admired for its beauty. It runs gracefully, as if on wings.",
    poliwag: "Its skin is so thin, its internal organs are visible. It has trouble walking on its newly grown feet.",
    poliwhirl: "Capable of living in or out of water. When out of water, it sweats to keep its body slimy.",
    poliwrath: "An adept swimmer at both the front crawl and breaststroke. Easily overtakes the best human swimmers.",
    abra: "Sleeps 18 hours a day. If it senses danger, it will teleport itself to safety even as it sleeps.",
    kadabra: "It emits special alpha waves from its body that induce headaches just by being close by.",
    alakazam: "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000.",
    machop: "Very powerful in spite of its small size. Its mastery of many types of martial arts makes it very tough.",
    machoke: "The belt around its waist holds back its energy. Without it, this Pokémon would be unstoppable.",
    machamp: "Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon.",
    bellsprout: "A carnivorous Pokémon that traps and eats bugs. It uses its root feet to soak up needed moisture.",
    weepinbell: "It spits out poisonpowder to immobilize the enemy and then finishes it with a spray of acid.",
    victreebel: "Lures prey with the sweet aroma of honey. Swallowed whole, the prey is melted in a day, bones and all.",
    tentacool: "Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid.",
    tentacruel: "Its 80 tentacles can stretch and contract freely. They wrap around prey and weaken it with poison.",
    geodude: "Found in fields and mountains. Mistaking them for boulders, people often step or trip on them.",
    graveler: "Rolls down slopes to move. It rolls over any obstacle without slowing or changing its direction.",
    golem: "Its boulder-like body is extremely hard. It can easily withstand dynamite blasts without damage.",
    ponyta: "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time.",
    rapidash: "Just loves to run. If it sees something faster than itself, it will give chase at top speed.",
    slowpoke: "Incredibly slow and sluggish. It is quite content to loll about without worrying about the time.",
    slowbro: "Its tail has a flavor that is beyond description. A small bite of it fills the body with energy.",
    magnemite: "It sends out electromagnetic waves, which let it float through the air. Touching it while it's eating electricity will give you a full-body shock.",
    magneton: "Generates strange radio signals. It raises the temperature by 3.6 degrees Fahrenheit within 3,300 feet.",
    farfetchd: "The sprig of green onions it holds is its weapon. It is used much like a metal sword.",
    doduo: "A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints.",
    dodrio: "When it needs to think, it rotates its head 180 degrees to sharpen its intellectual power.",
    seel: "The protruding horn on its head is very hard. It is used for bashing through thick ice.",
    dewgong: "Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters.",
    grimer: "Made of hardened sludge. It smells too putrid to touch. Even weeds won't grow in its path.",
    muk: "Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison.",
    shellder: "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open.",
    cloyster: "When attacked, it launches its horns in quick volleys. Its innards have never been seen.",
    gastly: "A being that exists as a thin gas. It can topple an Indian elephant by enveloping the prey in two seconds.",
    haunter: "It licks with its gaseous tongue to steal the victim's life force. It lurks in darkness for prey.",
    gengar: "Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright.",
    onix: "As it digs through the ground, it absorbs many hard objects. This is what makes its body so solid.",
    drowzee: "Puts enemies to sleep then eats their dreams. Occasionally gets sick from eating bad dreams.",
    hypno: "When it locks eyes with an enemy, it will use a mix of its pendulum and its special powers to make the foe feel drowsy.",
    krabby: "The pincers break off easily. If it loses a pincer, it somehow becomes incapable of walk.",
    kingler: "Its large and hard pincer has 10,000-horsepower strength. However, being so big, it is unwieldy to move.",
    voltorb: "It is said to camouflage itself as a Poké Ball. It will self-destruct with very little stimulus.",
    electrode: "It stores electrical energy inside its body. Even the slightest shock could trigger a huge explosion.",
    exeggcute: "If even one is separated from the group, the energy bond between the six will make them rejoin instantly.",
    exeggutor: "Legend has it that on rare occasions, one of its heads will drop off and continue on as an Exeggcute.",
    cubone: "Because it never removes its skull helmet, no one has ever seen this Pokémon's real face.",
    marowak: "Small and weak, this Pokémon is adept with its bone club. It has grown more vicious over the ages.",
    hitmonlee: "When kicking, the sole of its foot turns as hard as a diamond on impact and destroys its enemy.",
    hitmonchan: "While apparently doing nothing, it fires punches in lightning-fast volleys that are impossible to see.",
    lickitung: "Its tongue spans almost 7 feet and moves more freely than its forelegs. Its licks can cause paralysis.",
    koffing: "Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning.",
    weezing: "Where two kinds of poison gases meet, two Koffings can fuse into a Weezing over many years.",
    rhyhorn: "A Pokémon with a one-track mind. Once it charges, it won't stop running until it falls asleep.",
    rhydon: "Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees.",
    chansey: "People try to catch it for its extremely nutritious eggs, but it rarely can be found.",
    tangela: "The whole body is swathed with wide vines that are similar to sea kelp. They lash and ensnare foes.",
    kangaskhan: "Raises its young in its belly pouch. Won't run from any fight to keep its young protected.",
    horsea: "Known to shoot down flying bugs with precision blasts of ink from the surface of the water.",
    seadra: "Touching the back fin causes numbness. It hooks its tail to coral to stay in place while sleeping.",
    goldeen: "Its tail fin billows like an elegant ballroom dress, giving it the nickname of the Water Queen.",
    seaking: "In the autumn spawning season, they can be seen swimming powerfully up rivers and creeks.",
    staryu: "As long as the center section is unharmed, it can grow back fully even if it is chopped to bits.",
    starmie: "Its central core glows with the seven colors of the rainbow. Some people value the core as a gem.",
    mrMime: "If interrupted while it is miming, it will slap around the offender with its broad hands.",
    scyther: "With ninja-like agility and speed, it can create the illusion that there is more than one.",
    jynx: "It seductively wiggles its hips as it walks. It can cause people to dance in unison with it.",
    electabuzz: "Electricity runs across the surface of its body. In darkness, its entire body glows a whitish-blue.",
    magmar: "Its body always burns with an orange glow that enables it to hide perfectly among flames.",
    pinsir: "Grips its prey in its pincers and squeezes hard. It can't move if it's cold, so it lives in warm places.",
    tauros: "After heightening its will to fight by whipping itself with its three tails, it charges at full speed.",
    magikarp: "Famous for being very unreliable. It can be found swimming in seas, lakes, rivers, and shallow puddles.",
    gyarados: "Once it appears, it goes on a rampage. It remains enraged until it demolishes everything around it.",
    lapras: "A gentle soul that can read the minds of people. It can ferry people across the sea on its back.",
    ditto: "It can reconstitute its entire cellular structure to change into what it sees, but it returns to normal when it relaxes.",
    eevee: "A rare Pokémon that adapts to harsh environments by taking on different evolutionary forms.",
    vaporeon: "Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid's.",
    jolteon: "It accumulates negative ions in the atmosphere to blast out 10,000-volt lightning bolts.",
    flareon: "When storing thermal energy in its body, its temperature could soar to over 1600 degrees Fahrenheit.",
    porygon: "A Pokémon that consists entirely of programming code. Capable of moving freely in cyberspace.",
    omanyte: "Although long extinct, in rare cases, it can be genetically resurrected from fossils.",
    omastar: "Its heavy shell allowed it to reach only nearby food. This could be the reason it is extinct.",
    kabuto: "This Pokémon was regenerated from the fossil of an ancient creature. It protects itself with a hard shell.",
    kabutops: "Its sleek shape is perfect for swimming. It slashes prey with its claws and drains their fluids.",
    aerodactyl: "It was regenerated from a dinosaur's genetic matter that was found in amber. It flies with high-pitched cries.",
    snorlax: "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful.",
    articuno: "A legendary bird Pokémon. It freezes water that is contained in winter air and makes it snow.",
    zapdos: "This legendary bird Pokémon is said to appear when the sky turns dark and lightning showers down.",
    moltres: "It is said to be the legendary bird Pokémon of fire. Every flap of its wings creates a dazzling flare of flames.",
    dratini: "Long considered a mythical Pokémon until recently when a small colony was found living underwater.",
    dragonair: "A mystical Pokémon that exudes a gentle aura. Has the ability to change climate conditions.",
    dragonite: "Very few people have seen this Pokémon in the wild. Its intelligence is said to match that of humans.",
    mewtwo: "A Pokémon created by recombining Mew's genes. It's said to have the most savage heart among Pokémon.",
    mew: "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide.",
};


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Posts />} />
                {/* Pass weight and description props to Detail component */}
                <Route 
  path="/detail/:id" 
  element={<Detail pokemonList={pokemon} descriptions={descriptions} />} 
/>

            </Routes>
        </Router>
    );
};

export default App;
