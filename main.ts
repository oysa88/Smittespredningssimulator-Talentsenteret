namespace SpriteKind {
    export const Syk = SpriteKind.create()
    export const Frisk = SpriteKind.create()
    export const Imun = SpriteKind.create()
    export const Lege = SpriteKind.create()
    export const Vaksinator = SpriteKind.create()
    export const Død = SpriteKind.create()
}
function Bevegelse () {
    for (let FriskListSPRITE of FriskLIST) {
        FriskListSPRITE.x = FriskListSPRITE.x + randint(hastighetFriske * -1, hastighetFriske)
        FriskListSPRITE.y = FriskListSPRITE.y + randint(hastighetFriske * -1, hastighetFriske)
        FriskListSPRITE.setStayInScreen(true)
    }
    for (let SykListSPRITE of SykLIST) {
        SykListSPRITE.x = SykListSPRITE.x + randint(hastighetSyke * -1, hastighetSyke)
        SykListSPRITE.y = SykListSPRITE.y + randint(hastighetSyke * -1, hastighetSyke)
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
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mutasjon > 6) {
        mutasjon = 6
    } else {
        mutasjon += 1
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game.splash("Friske:" + antallFriske, "Syke:" + antallSyke)
    game.splash("Imune:" + antallImune, "Døde:" + antallDøde)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    F_Frisk = sprites.create(assets.image`Frisk`, SpriteKind.Frisk)
    F_Frisk.setPosition(randint(0, 160), randint(0, 120))
    FriskLIST.push(F_Frisk)
    if (legeAktiv) {
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
function SetupMutasjon () {
    FriskM1 = 95
    SmitteM1 = 87
    FriskM2 = 77
    SmitteM2 = 65
    FriskM3 = 89
    SmitteM3 = 88
    FriskM4 = 98
    SmitteM4 = 88
    FriskM5 = 56
    SmitteM5 = 82
    FriskM6 = 94
    SmitteM6 = 56
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mutasjon < 1) {
        mutasjon = 1
    } else {
        mutasjon += -1
    }
})
function Mutasjoner () {
    if (mutasjon == 1) {
        prosentSmitte = SmitteM1
        prosentBliFrisk = FriskM1
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
                            . . . f 2 2 . . . . . . . . . . 
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
                    }
                }
            }
        }
    } else if (mutasjon == 2) {
        prosentSmitte = SmitteM2
        prosentBliFrisk = FriskM2
        for (let FriskListSPRITE22 of FriskLIST) {
            for (let SykListSPRITE22 of SykLIST) {
                tilfeldigTallSyk = randint(0, 100)
                if (FriskListSPRITE22.overlapsWith(SykListSPRITE22)) {
                    if (tilfeldigTallSyk < prosentSmitte) {
                        FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE22))
                        FriskListSPRITE22.destroy()
                        FriskListSPRITE22 = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 2 f 2 . . . . . . . . . . 
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
                        FriskListSPRITE22.setPosition(SykListSPRITE22.x, SykListSPRITE22.y)
                        SykLIST.push(FriskListSPRITE22)
                    }
                }
            }
        }
    } else if (mutasjon == 3) {
        prosentSmitte = SmitteM3
        prosentBliFrisk = FriskM3
        for (let FriskListSPRITE23 of FriskLIST) {
            for (let SykListSPRITE23 of SykLIST) {
                tilfeldigTallSyk = randint(0, 100)
                if (FriskListSPRITE23.overlapsWith(SykListSPRITE23)) {
                    if (tilfeldigTallSyk < prosentSmitte) {
                        FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE23))
                        FriskListSPRITE23.destroy()
                        FriskListSPRITE23 = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 2 2 f . . . . . . . . . . 
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
                        FriskListSPRITE23.setPosition(SykListSPRITE23.x, SykListSPRITE23.y)
                        SykLIST.push(FriskListSPRITE23)
                    }
                }
            }
        }
    } else if (mutasjon == 4) {
        prosentSmitte = SmitteM4
        prosentBliFrisk = FriskM4
        for (let FriskListSPRITE24 of FriskLIST) {
            for (let SykListSPRITE24 of SykLIST) {
                tilfeldigTallSyk = randint(0, 100)
                if (FriskListSPRITE24.overlapsWith(SykListSPRITE24)) {
                    if (tilfeldigTallSyk < prosentSmitte) {
                        FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE24))
                        FriskListSPRITE24.destroy()
                        FriskListSPRITE24 = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 2 2 2 . . . . . . . . . . 
                            . . . f 2 2 . . . . . . . . . . 
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
                        FriskListSPRITE24.setPosition(SykListSPRITE24.x, SykListSPRITE24.y)
                        SykLIST.push(FriskListSPRITE24)
                    }
                }
            }
        }
    } else if (mutasjon == 5) {
        prosentSmitte = SmitteM5
        prosentBliFrisk = FriskM5
        for (let FriskListSPRITE25 of FriskLIST) {
            for (let SykListSPRITE25 of SykLIST) {
                tilfeldigTallSyk = randint(0, 100)
                if (FriskListSPRITE25.overlapsWith(SykListSPRITE25)) {
                    if (tilfeldigTallSyk < prosentSmitte) {
                        FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE25))
                        FriskListSPRITE25.destroy()
                        FriskListSPRITE25 = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 2 2 2 . . . . . . . . . . 
                            . . . 2 f 2 . . . . . . . . . . 
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
                        FriskListSPRITE25.setPosition(SykListSPRITE25.x, SykListSPRITE25.y)
                        SykLIST.push(FriskListSPRITE25)
                    }
                }
            }
        }
    } else if (mutasjon == 6) {
        prosentSmitte = SmitteM6
        prosentBliFrisk = FriskM6
        for (let FriskListSPRITE26 of FriskLIST) {
            for (let SykListSPRITE26 of SykLIST) {
                tilfeldigTallSyk = randint(0, 100)
                if (FriskListSPRITE26.overlapsWith(SykListSPRITE26)) {
                    if (tilfeldigTallSyk < prosentSmitte) {
                        FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE26))
                        FriskListSPRITE26.destroy()
                        FriskListSPRITE26 = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . 2 2 2 . . . . . . . . . . 
                            . . . 2 2 f . . . . . . . . . . 
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
                        FriskListSPRITE26.setPosition(SykListSPRITE26.x, SykListSPRITE26.y)
                        SykLIST.push(FriskListSPRITE26)
                    }
                }
            }
        }
    }
}
function Doktor () {
    if (Dager >= Vaksineutviklingstid && !(vaksineActive)) {
        vaksineActive = true
    }
    if (Dager >= LegeDelay && !(legeAktiv)) {
        legeAktiv = true
        sisteLegeTid = game.runtime()
        legeAktivering = false
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
                } else {
                    SykLIST.removeAt(SykLIST.indexOf(SykListSPRITE3))
                    SykListSPRITE3.destroy()
                    SykListSPRITE3 = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . 1 f 1 . . . . . . . . . . 
                        . . . f f f . . . . . . . . . . 
                        . . . 1 f 1 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Død)
                    SykListSPRITE3.setPosition(LegeListSPRITE3.x, LegeListSPRITE3.y)
                    DødLIST.push(SykListSPRITE3)
                }
            }
        }
    }
}
let Dag = 0
let antallLeger = 0
let tilfeldigTallFrisk = 0
let legeAktivering = false
let sisteLegeTid = 0
let tilfeldigTallSyk = 0
let SmitteM6 = 0
let FriskM6 = 0
let SmitteM5 = 0
let FriskM5 = 0
let SmitteM4 = 0
let FriskM4 = 0
let SmitteM3 = 0
let FriskM3 = 0
let SmitteM2 = 0
let FriskM2 = 0
let SmitteM1 = 0
let FriskM1 = 0
let L_Lege: Sprite = null
let antallDøde = 0
let antallImune = 0
let antallSyke = 0
let antallFriske = 0
let mutasjon = 0
let F_Frisk: Sprite = null
let vaksineActive = false
let legeAktiv = false
let DødLIST: Sprite[] = []
let LegeLIST: Sprite[] = []
let VaksineLIST: Sprite[] = []
let FriskLIST: Sprite[] = []
let SykLIST: Sprite[] = []
let prosentBliFrisk = 0
let prosentSmitte = 0
let Vaksineutviklingstid = 0
let LegeDelay = 0
let hastighetLege = 0
let hastighetVaksinert = 0
let hastighetSyke = 0
let hastighetFriske = 0
let Dager = 0
let ScreenHight = 0
let ScreenWidth = 0
ScreenWidth = scene.screenWidth()
ScreenHight = scene.screenHeight()
let lengdeDag = 3000
let update = 200
Dager = 1
info.setScore(Dager)
let lageFriskePersoner = 150
hastighetFriske = 5
hastighetSyke = 2
hastighetVaksinert = 7
hastighetLege = 10
LegeDelay = 5
let LegeAktiveringsInterval = 3 * lengdeDag
let maksAntallLeger = 10
Vaksineutviklingstid = 20
prosentSmitte = 60
prosentBliFrisk = 95
SykLIST = sprites.allOfKind(SpriteKind.Syk)
FriskLIST = sprites.allOfKind(SpriteKind.Frisk)
VaksineLIST = sprites.allOfKind(SpriteKind.Imun)
LegeLIST = sprites.allOfKind(SpriteKind.Lege)
DødLIST = sprites.allOfKind(SpriteKind.Død)
legeAktiv = false
vaksineActive = false
SetupMutasjon()
scene.setBackgroundColor(15)
tiles.setWallAt(tiles.getTileLocation(ScreenWidth, ScreenHight), true)
for (let index = 0; index < lageFriskePersoner; index++) {
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
forever(function () {
    if (game.runtime() > LegeAktiveringsInterval + sisteLegeTid) {
        legeAktivering = true
    }
    if (legeAktivering && legeAktiv && antallLeger < maksAntallLeger) {
        legeAktivering = false
        sisteLegeTid = game.runtime()
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
    if (game.runtime() > Dag + lengdeDag) {
        Dag = game.runtime()
        Dager += 1
        info.setScore(Dager)
    }
    if (Dager > 15) {
        if (antallDøde >= 15) {
            game.splash("Antall Dager" + Dager, "Antall Døde" + antallDøde)
            game.over(false)
        } else if (antallFriske == 0 && antallDøde < 15) {
            game.splash("Antall Dager" + Dager, "Antall Døde" + antallDøde)
            game.over(true)
        }
    }
    Bevegelse()
    Mutasjoner()
    Doktor()
    pause(update)
    antallFriske = FriskLIST.length
    antallSyke = SykLIST.length
    antallImune = VaksineLIST.length
    antallLeger = LegeLIST.length
    antallDøde = DødLIST.length
})
