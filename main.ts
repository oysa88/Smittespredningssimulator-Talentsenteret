namespace SpriteKind {
    export const Syk = SpriteKind.create()
    export const Frisk = SpriteKind.create()
    export const Imun = SpriteKind.create()
    export const Lege = SpriteKind.create()
    export const Vaksinator = SpriteKind.create()
}
function Bevegelse () {
    for (let FriskListSPRITE of FriskLIST) {
        FriskListSPRITE.x = FriskListSPRITE.x + randint(hastighetUvaksinert * -1, hastighetUvaksinert)
        FriskListSPRITE.y = FriskListSPRITE.y + randint(hastighetUvaksinert * -1, hastighetUvaksinert)
        FriskListSPRITE.setStayInScreen(true)
    }
    for (let SykListSPRITE of SykLIST) {
        SykListSPRITE.x = SykListSPRITE.x + randint(hastighetUvaksinert * -1, hastighetUvaksinert)
        SykListSPRITE.y = SykListSPRITE.y + randint(hastighetUvaksinert * -1, hastighetUvaksinert)
        SykListSPRITE.setStayInScreen(true)
    }
    for (let VaksineListSPRITE of VaksineLIST) {
        VaksineListSPRITE.x = VaksineListSPRITE.x + randint(hastighetVaksinert * -1, hastighetVaksinert)
        VaksineListSPRITE.y = VaksineListSPRITE.y + randint(hastighetVaksinert * -1, hastighetVaksinert)
        VaksineListSPRITE.setStayInScreen(true)
    }
    for (let LegeListSPRITE of LegeLIST) {
        LegeListSPRITE.x = LegeListSPRITE.x + randint(hastighetLege * -1, hastighetLege)
        LegeListSPRITE.y = LegeListSPRITE.y + randint(hastighetLege * -1, hastighetLege)
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
    for (let FriskListSPRITE2 of FriskLIST) {
        for (let SykListSPRITE2 of SykLIST) {
            tilfeldigTallSyk = randint(0, 100)
            if (FriskListSPRITE2.overlapsWith(SykListSPRITE2)) {
                if (tilfeldigTallSyk < prosentSmitte) {
                    FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE2))
                    FriskListSPRITE2.destroy()
                    FriskListSPRITE2 = sprites.create(img`
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
                    FriskListSPRITE2.setPosition(SykListSPRITE2.x, SykListSPRITE2.y)
                    SykLIST.push(FriskListSPRITE2)
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
        for (let FriskListSPRITE3 of FriskLIST) {
            for (let LegeListSPRITE2 of LegeLIST) {
                if (FriskListSPRITE3.overlapsWith(LegeListSPRITE2)) {
                    FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE3))
                    FriskListSPRITE3.destroy()
                    FriskListSPRITE3 = sprites.create(assets.image`Syk`, SpriteKind.Imun)
                    FriskListSPRITE3.setPosition(LegeListSPRITE2.x, LegeListSPRITE2.y)
                    VaksineLIST.push(FriskListSPRITE3)
                }
            }
        }
    }
    for (let SykListSPRITE3 of SykLIST) {
        for (let LegeListSPRITE3 of LegeLIST) {
            tilfeldigTallFrisk = randint(0, 100)
            if (SykListSPRITE3.overlapsWith(LegeListSPRITE3)) {
                if (tilfeldigTallFrisk < prosentBliFrisk) {
                    SykLIST.removeAt(SykLIST.indexOf(SykListSPRITE3))
                    SykListSPRITE3.destroy()
                    SykListSPRITE3 = sprites.create(img`
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
                    SykListSPRITE3.setPosition(LegeListSPRITE3.x, LegeListSPRITE3.y)
                    FriskLIST.push(SykListSPRITE3)
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
let hastighetLege = 0
let hastighetVaksinert = 0
let hastighetUvaksinert = 0
let Vaksineutviklingstid = 0
let LegeDelay = 0
let ScreenHight = 0
let ScreenWidth = 0
ScreenWidth = scene.screenWidth()
ScreenHight = scene.screenHeight()
LegeDelay = 10
Vaksineutviklingstid = 25
let update = 500
hastighetUvaksinert = 5
hastighetVaksinert = 7
hastighetLege = 10
tiles.setWallAt(tiles.getTileLocation(scene.screenHeight(), scene.screenWidth()), true)
prosentSmitte = game.askForNumber("Sett prosent sannsynlig for å bli smittet:", 2)
prosentBliFrisk = game.askForNumber("Sett prosent sannsynlig for å bli frisk:", 2)
SykLIST = sprites.allOfKind(SpriteKind.Syk)
FriskLIST = sprites.allOfKind(SpriteKind.Frisk)
VaksineLIST = sprites.allOfKind(SpriteKind.Imun)
LegeLIST = sprites.allOfKind(SpriteKind.Lege)
legeActive = false
vaksineActive = false
scene.setBackgroundColor(15)
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
game.onUpdateInterval(update, function () {
    Bevegelse()
    Syke()
    Doktor()
})
