namespace SpriteKind {
    export const Syk = SpriteKind.create()
    export const Frisk = SpriteKind.create()
    export const Imun = SpriteKind.create()
    export const Lege = SpriteKind.create()
    export const Vaksinator = SpriteKind.create()
}
function Bevegelse () {
    for (let FriskListSPRITE of FriskLIST) {
        FriskListSPRITE.x = FriskListSPRITE.x + randint(-4, 4)
        FriskListSPRITE.y = FriskListSPRITE.y + randint(-4, 4)
        FriskListSPRITE.setStayInScreen(true)
    }
    for (let SykListSPRITE of SykLIST) {
        SykListSPRITE.x = SykListSPRITE.x + randint(-4, 4)
        SykListSPRITE.y = SykListSPRITE.y + randint(-4, 4)
        SykListSPRITE.setStayInScreen(true)
    }
    for (let VaksineListSPRITE of VaksineLIST) {
        VaksineListSPRITE.x = VaksineListSPRITE.x + randint(-7, 7)
        VaksineListSPRITE.y = VaksineListSPRITE.y + randint(-7, 7)
        VaksineListSPRITE.setStayInScreen(true)
    }
    for (let LegeListSPRITE of LegeLIST) {
        LegeListSPRITE.x = LegeListSPRITE.x + randint(-10, 10)
        LegeListSPRITE.y = LegeListSPRITE.y + randint(-10, 10)
        LegeListSPRITE.setStayInScreen(true)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    antallFriske = FriskLIST.length
    antallSyke = SykLIST.length
    antallImune = VaksineLIST.length
    game.splash("Friske:" + antallFriske, "Syke:" + antallSyke)
    game.splash("Imune:" + antallImune)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    F_Frisk = sprites.create(assets.image`Frisk`, SpriteKind.Frisk)
    F_Frisk.setPosition(randint(0, 160), randint(0, 120))
    FriskLIST.push(F_Frisk)
    if (legeActive) {
        L_Lege = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 7 7 7 7 . . . . . . . . . 
            . . . 7 7 7 7 . . . . . . . . . 
            . . . 7 7 7 7 . . . . . . . . . 
            . . . 7 7 7 7 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Lege)
        L_Lege.setPosition(randint(0, ScreenWidth), randint(0, ScreenHight))
        LegeLIST.push(L_Lege)
    }
})
function Syke () {
    for (let FriskListSPRITE of FriskLIST) {
        for (let SykListSPRITE of SykLIST) {
            tilfeldigTallSyk = randint(0, 100)
            if (FriskListSPRITE.overlapsWith(SykListSPRITE)) {
                if (tilfeldigTallSyk < prosentSmitte) {
                    FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE))
                    FriskListSPRITE.destroy()
                    FriskListSPRITE = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . 2 2 2 . . . . . . . . . . 
                        . . . 2 2 2 . . . . . . . . . . 
                        . . . 2 2 2 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Syk)
                    FriskListSPRITE.setPosition(SykListSPRITE.x, SykListSPRITE.y)
                    SykLIST.push(FriskListSPRITE)
                    info.changeScoreBy(1)
                }
            }
        }
    }
}
function Doktor () {
    if (info.score() >= Vaksineutviklingstid && !(vaksineActive)) {
        vaksineActive = true
    }
    if (info.score() >= LegeDelay && !(legeActive)) {
        legeActive = true
        L_Lege = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 7 7 7 7 . . . . . . . . . 
            . . . 7 7 7 7 . . . . . . . . . 
            . . . 7 7 7 7 . . . . . . . . . 
            . . . 7 7 7 7 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Lege)
        L_Lege.setPosition(randint(0, ScreenWidth), randint(0, ScreenHight))
        LegeLIST.push(L_Lege)
    }
    if (vaksineActive) {
        for (let FriskListSPRITE of FriskLIST) {
            for (let LegeListSPRITE of LegeLIST) {
                if (FriskListSPRITE.overlapsWith(LegeListSPRITE)) {
                    FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE))
                    FriskListSPRITE.destroy()
                    FriskListSPRITE = sprites.create(assets.image`Syk`, SpriteKind.Imun)
                    FriskListSPRITE.setPosition(LegeListSPRITE.x, LegeListSPRITE.y)
                    VaksineLIST.push(FriskListSPRITE)
                }
            }
        }
    }
    for (let SykListSPRITE of SykLIST) {
        for (let LegeListSPRITE of LegeLIST) {
            tilfeldigTallFrisk = randint(0, 100)
            if (SykListSPRITE.overlapsWith(LegeListSPRITE)) {
                if (tilfeldigTallFrisk < prosentBliFrisk) {
                    SykLIST.removeAt(SykLIST.indexOf(SykListSPRITE))
                    SykListSPRITE.destroy()
                    SykListSPRITE = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . 1 1 1 . . . . . . . . . . 
                        . . . 1 1 1 . . . . . . . . . . 
                        . . . 1 1 1 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Frisk)
                    SykListSPRITE.setPosition(LegeListSPRITE.x, LegeListSPRITE.y)
                    FriskLIST.push(SykListSPRITE)
                }
            }
        }
    }
}
let tilfeldigTallFrisk = 0
let tilfeldigTallSyk = 0
let L_Lege: Sprite = null
let antallImune = 0
let antallSyke = 0
let antallFriske = 0
let F_Frisk: Sprite = null
let vaksineActive = false
let legeActive = false
let LegeLIST: Sprite[] = []
let VaksineLIST: Sprite[] = []
let FriskLIST: Sprite[] = []
let SykLIST: Sprite[] = []
let prosentBliFrisk = 0
let prosentSmitte = 0
let Vaksineutviklingstid = 0
let LegeDelay = 0
let ScreenHight = 0
let ScreenWidth = 0
ScreenWidth = scene.screenWidth()
ScreenHight = scene.screenHeight()
LegeDelay = 10
Vaksineutviklingstid = 25
tiles.setWallAt(tiles.getTileLocation(scene.screenHeight(), scene.screenWidth()), true)
prosentSmitte = 70
prosentBliFrisk = 95
SykLIST = sprites.allOfKind(SpriteKind.Syk)
FriskLIST = sprites.allOfKind(SpriteKind.Frisk)
VaksineLIST = sprites.allOfKind(SpriteKind.Imun)
LegeLIST = sprites.allOfKind(SpriteKind.Lege)
legeActive = false
vaksineActive = false
scene.setBackgroundColor(15)
let update = 2000
for (let index = 0; index < 150; index++) {
    F_Frisk = sprites.create(assets.image`Frisk`, SpriteKind.Frisk)
    F_Frisk.setPosition(randint(0, ScreenWidth), randint(0, ScreenHight))
    FriskLIST.push(F_Frisk)
}
let S_Syk = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 2 2 2 . . . . . . . . . . 
    . . . 2 2 2 . . . . . . . . . . 
    . . . 2 2 2 . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Syk)
S_Syk.setPosition(randint(0, ScreenWidth), randint(0, ScreenHight))
SykLIST.push(S_Syk)
info.setScore(1)
forever(function () {
    Bevegelse()
    Syke()
    Doktor()
    pause(500)
})
