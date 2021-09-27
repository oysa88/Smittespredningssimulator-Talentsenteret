namespace SpriteKind {
    export const Syk = SpriteKind.create()
    export const Frisk = SpriteKind.create()
    export const Imun = SpriteKind.create()
    export const Lege = SpriteKind.create()
    export const Vaksinator = SpriteKind.create()
    export const Død = SpriteKind.create()
    export const VaksineSyk = SpriteKind.create()
}
// Bestemme bevegelsene til de forskjellige spritene
function Bevegelse () {
    // Sette opp bevegelsene til friske sprites
    for (let FriskListSPRITE of FriskLIST) {
        FriskListSPRITE.x = FriskListSPRITE.x + randint(hastighetFriske * -1, hastighetFriske)
        FriskListSPRITE.y = FriskListSPRITE.y + randint(hastighetFriske * -1, hastighetFriske)
        FriskListSPRITE.setStayInScreen(true)
    }
    // Sette opp bevegelsene til syke sprites
    for (let SykListSPRITE of SykLIST) {
        SykListSPRITE.x = SykListSPRITE.x + randint(hastighetSyke * -1, hastighetSyke)
        SykListSPRITE.y = SykListSPRITE.y + randint(hastighetSyke * -1, hastighetSyke)
        SykListSPRITE.setStayInScreen(true)
    }
    // Sette opp bevegelsene til vaksinerte sprites
    for (let VaksineListSPRITE of VaksineLIST) {
        VaksineListSPRITE.x = VaksineListSPRITE.x + randint(hastighetVaksinert * -1, hastighetVaksinert)
        VaksineListSPRITE.y = VaksineListSPRITE.y + randint(hastighetVaksinert * -1, hastighetVaksinert)
        VaksineListSPRITE.setStayInScreen(true)
    }
    // Sette opp bevegelsene til syk og vaksinert sprites
    for (let VaksinertSykListSPRITE of VaksinertSykLIST) {
        VaksinertSykListSPRITE.x = VaksinertSykListSPRITE.x + randint(hastighetSyke * -1, hastighetSyke)
        VaksinertSykListSPRITE.y = VaksinertSykListSPRITE.y + randint(hastighetSyke * -1, hastighetSyke)
        VaksinertSykListSPRITE.setStayInScreen(true)
    }
    // Sette opp bevegelsene til lege sprites
    for (let LegeListSPRITE of LegeLIST) {
        LegeListSPRITE.x = LegeListSPRITE.x + randint(hastighetLege * -1, hastighetLege)
        LegeListSPRITE.y = LegeListSPRITE.y + randint(hastighetLege * -1, hastighetLege)
        LegeListSPRITE.setStayInScreen(true)
    }
}
// Her gjøres friske sprite om til syke
function Sykdom () {
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
                    FriskListSPRITE23.setPosition(SykListSPRITE23.x, SykListSPRITE23.y)
                    SykLIST.push(FriskListSPRITE23)
                }
            }
        }
    }
}
// Endre mutasjon nr. oppover med opp-knappen
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mutasjon > 6) {
        mutasjon = 6
    } else {
        mutasjon += 1
    }
})
// Vise oversikt over de forskjellige spritene
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game.splash("Friske:" + antallFriske, "Syke:" + antallSyke)
    game.splash("Imune:" + antallImune, "Døde:" + antallDøde)
    game.splash("Leger:" + antallLeger, "R-tall:" + Rtall2)
})
// Her bestemmes hva som skjer med imune sprite
function Imunitet () {
    for (let VaksineListSPRITE2 of VaksineLIST) {
        for (let SykListSPRITE2 of SykLIST) {
            tilfeldigTallFrisk = randint(0, 100)
            if (SykListSPRITE2.overlapsWith(VaksineListSPRITE2)) {
                // Sjekker om en imun person blir smittet eller ikke
                if (tilfeldigTallFrisk < prosentImunBliSyk) {
                    VaksineLIST.removeAt(VaksineLIST.indexOf(VaksineListSPRITE2))
                    VaksineListSPRITE2.destroy()
                    VaksineListSPRITE2 = sprites.create(img`
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
                    VaksineListSPRITE2.setPosition(SykListSPRITE2.x, SykListSPRITE2.y)
                    VaksinertSykLIST.push(VaksineListSPRITE2)
                }
            }
        }
    }
}
// Legg til en frisk sprite og en lege hvis mulig
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
// Bestemme sannsynligheten for å bli smittet og frisk igjen for mutasjonene
function SetupMutasjon () {
    // Sannsynlighet for å bli frisk av mutasjon nr. 1
    FriskM1 = 95
    // Sannsynlighet for å bli smittet av mutasjon nr. 1
    SmitteM1 = 87
    // Sannsynlighet for å bli frisk av mutasjon nr. 2
    FriskM2 = 77
    // Sannsynlighet for å bli smittet av mutasjon nr. 2
    SmitteM2 = 65
    // Sannsynlighet for å bli frisk av mutasjon nr. 3
    FriskM3 = 89
    // Sannsynlighet for å bli smittet av mutasjon nr. 3
    SmitteM3 = 88
    // Sannsynlighet for å bli frisk av mutasjon nr. 4
    FriskM4 = 98
    // Sannsynlighet for å bli smittet av mutasjon nr. 4
    SmitteM4 = 88
    // Sannsynlighet for å bli frisk av mutasjon nr. 5
    FriskM5 = 54
    // Sannsynlighet for å bli smittet av mutasjon nr. 5
    SmitteM5 = 82
    // Sannsynlighet for å bli frisk av mutasjon nr. 6
    FriskM6 = 94
    // Sannsynlighet for å bli smittet av mutasjon nr. 6
    SmitteM6 = 56
}
function Rtall () {
    if (game.runtime() > RtallInterval + sisteRtallTid) {
        beregneR = true
    }
    if (beregneR) {
        beregneR = false
        sisteRtallTid = game.runtime()
        nyeSmittedeSiste3Dager = antallSyke - antallSmittede3dager
        Rtall2 = nyeSmittedeSiste3Dager / antallSmittede3dager
        antallSmittede3dager = antallSyke
    }
}
// Endre mutasjon nr. nedover med ned-knappen
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mutasjon < 0) {
        mutasjon = 0
    } else {
        mutasjon += -1
    }
})
// Bestemme hvilken mutasjon som viruset skal ha
function Mutasjoner () {
    if (mutasjon == 1) {
        // Sette sannsynlighet for å bli smittet til å være M1
        prosentSmitte = SmitteM1
        // Sette sannsynlighet for å bli frisk av mutasjon M1
        prosentBliFrisk = FriskM1
        for (let FriskListSPRITE2 of FriskLIST) {
            for (let SykListSPRITE22 of SykLIST) {
                tilfeldigTallSyk = randint(0, 100)
                if (FriskListSPRITE2.overlapsWith(SykListSPRITE22)) {
                    // Sjekker om frisk sprite blir syk
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
                        FriskListSPRITE2.setPosition(SykListSPRITE22.x, SykListSPRITE22.y)
                        SykLIST.push(FriskListSPRITE2)
                    }
                }
            }
        }
    } else if (mutasjon == 2) {
        // Sette sannsynlighet for å bli smittet til å være M2
        prosentSmitte = SmitteM2
        // Sette sannsynlighet for å bli frisk av mutasjon M2
        prosentBliFrisk = FriskM2
        for (let FriskListSPRITE22 of FriskLIST) {
            for (let SykListSPRITE222 of SykLIST) {
                tilfeldigTallSyk = randint(0, 100)
                if (FriskListSPRITE22.overlapsWith(SykListSPRITE222)) {
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
                        FriskListSPRITE22.setPosition(SykListSPRITE222.x, SykListSPRITE222.y)
                        SykLIST.push(FriskListSPRITE22)
                    }
                }
            }
        }
    } else if (mutasjon == 3) {
        // Sette sannsynlighet for å bli smittet til å være M3
        prosentSmitte = SmitteM3
        // Sette sannsynlighet for å bli frisk av mutasjon M3
        prosentBliFrisk = FriskM3
        for (let FriskListSPRITE232 of FriskLIST) {
            for (let SykListSPRITE232 of SykLIST) {
                tilfeldigTallSyk = randint(0, 100)
                if (FriskListSPRITE232.overlapsWith(SykListSPRITE232)) {
                    if (tilfeldigTallSyk < prosentSmitte) {
                        FriskLIST.removeAt(FriskLIST.indexOf(FriskListSPRITE232))
                        FriskListSPRITE232.destroy()
                        FriskListSPRITE232 = sprites.create(img`
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
                        FriskListSPRITE232.setPosition(SykListSPRITE232.x, SykListSPRITE232.y)
                        SykLIST.push(FriskListSPRITE232)
                    }
                }
            }
        }
    } else if (mutasjon == 4) {
        // Sette sannsynlighet for å bli smittet til å være M4
        prosentSmitte = SmitteM4
        // Sette sannsynlighet for å bli frisk av mutasjon M4
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
        // Sette sannsynlighet for å bli smittet til å være M5
        prosentSmitte = SmitteM5
        // Sette sannsynlighet for å bli frisk av mutasjon M5
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
        // Sette sannsynlighet for å bli smittet til å være M6
        prosentSmitte = SmitteM6
        // Sette sannsynlighet for å bli frisk av mutasjon M6
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
// Styrer funksjonene som legene utfører
function Doktor () {
    // Bestemme når vaksinen skal aktiveres
    if (Dager >= Vaksineutviklingstid && !(vaksineActive)) {
        vaksineActive = true
    }
    // Bestemme når legene skal aktiveres
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
    // Funksjon for å vaksinere friske sprites
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
    // Funksjon for å helbrede en syk sprite
    for (let SykListSPRITE3 of SykLIST) {
        for (let LegeListSPRITE3 of LegeLIST) {
            tilfeldigTallFrisk = randint(0, 100)
            if (SykListSPRITE3.overlapsWith(LegeListSPRITE3)) {
                // Sjekker om pasienten kan bli frisk igjen
                // Pasienter som ikke blir friske igjen, dør
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
    // Funksjon for å helbrede en syk sprite
    for (let VaksinertSykListSPRITE2 of VaksinertSykLIST) {
        for (let LegeListSPRITE32 of LegeLIST) {
            tilfeldigTallFrisk = randint(0, 100)
            if (VaksinertSykListSPRITE2.overlapsWith(VaksinertSykListSPRITE2)) {
                // Sjekker om pasienten kan bli frisk igjen
                // Pasienter som ikke blir friske igjen, dør
                if (tilfeldigTallFrisk <= prosentImunBliSyk) {
                    VaksinertSykLIST.removeAt(VaksinertSykLIST.indexOf(VaksinertSykListSPRITE2))
                    VaksinertSykListSPRITE2.destroy()
                    VaksinertSykListSPRITE2 = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . 9 9 9 . . . . . . . . . . 
                        . . . 9 9 9 . . . . . . . . . . 
                        . . . 9 9 9 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Imun)
                    VaksinertSykListSPRITE2.setPosition(LegeListSPRITE32.x, LegeListSPRITE32.y)
                    VaksineLIST.push(VaksinertSykListSPRITE2)
                } else {
                    VaksinertSykLIST.removeAt(VaksinertSykLIST.indexOf(VaksinertSykListSPRITE2))
                    VaksinertSykListSPRITE2.destroy()
                    VaksinertSykListSPRITE2 = sprites.create(img`
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
                    DødLIST.push(VaksinertSykListSPRITE2)
                }
            }
        }
    }
}
let antallSprites = 0
let Flokkimunitet = 0
let Dag = 0
let legeAktivering = false
let sisteLegeTid = 0
let nyeSmittedeSiste3Dager = 0
let beregneR = false
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
let tilfeldigTallFrisk = 0
let Rtall2 = 0
let antallLeger = 0
let antallDøde = 0
let antallImune = 0
let antallSyke = 0
let antallFriske = 0
let mutasjon = 0
let tilfeldigTallSyk = 0
let F_Frisk: Sprite = null
let vaksineActive = false
let legeAktiv = false
let DødLIST: Sprite[] = []
let LegeLIST: Sprite[] = []
let VaksinertSykLIST: Sprite[] = []
let VaksineLIST: Sprite[] = []
let FriskLIST: Sprite[] = []
let SykLIST: Sprite[] = []
let prosentImunBliSyk = 0
let prosentBliFrisk = 0
let prosentSmitte = 0
let Vaksineutviklingstid = 0
let antallSmittede3dager = 0
let sisteRtallTid = 0
let RtallInterval = 0
let LegeDelay = 0
let hastighetLege = 0
let hastighetVaksinert = 0
let hastighetSyke = 0
let hastighetFriske = 0
let Dager = 0
let ScreenHight = 0
let ScreenWidth = 0
// Bestemme bredden på skjermen
ScreenWidth = scene.screenWidth()
// Bestemme høyde på skjermen
ScreenHight = scene.screenHeight()
// En dag er 3 sek.
let lengdeDag = 3000
// Oppdaterer forsøket hver 200ms.
let update = 200
// Forsøket starter på dag nr. 1
Dager = 1
info.setScore(Dager)
// Bestem hvor mange friske personer som skal være med i forsøket
let lageFriskePersoner = 150
// Hastigheten til friske sprites er +-antall ruter
hastighetFriske = 5
// Hastigheten til syke sprites er +-antall ruter
hastighetSyke = 2
// Hastigheten til vaksinerte sprites er +-antall ruter
hastighetVaksinert = 7
// Hastigheten til lege sprites er +-antall ruter
hastighetLege = 10
// Antall dager før legene kommer for å hjelpe
LegeDelay = 3
// Interval mellom hver nye lege som kommer
let LegeAktiveringsInterval = 2 * lengdeDag
// Interval mellom hver nye lege som kommer
RtallInterval = 3 * lengdeDag
sisteRtallTid = game.runtime()
antallSmittede3dager = 1
// Maks antall leger
let maksAntallLeger = 10
// Antall dager før vaksinen er klar
Vaksineutviklingstid = 20
// Sannsynlighet for å bli smittet
prosentSmitte = 60
// Sannsynlighet for å bli frisk igjen
prosentBliFrisk = 95
// Sannsynlighet for å bli syk hvis man er vaksinert
prosentImunBliSyk = 2
// Sannsynlighet for å bli frisk igjen hvis man er vaksine
let prosentImunBliFrisk = 99
SykLIST = sprites.allOfKind(SpriteKind.Syk)
FriskLIST = sprites.allOfKind(SpriteKind.Frisk)
VaksineLIST = sprites.allOfKind(SpriteKind.Imun)
VaksinertSykLIST = sprites.allOfKind(SpriteKind.VaksineSyk)
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
            game.splash("Antall Friske:" + antallFriske, "Antall Imune:" + antallImune)
            game.over(false)
        } else if (Flokkimunitet >= 0.9 && antallDøde < 15) {
            game.splash("Antall Dager" + Dager, "Antall Døde" + antallDøde)
            game.splash("Antall Friske:" + antallFriske, "Antall Imune:" + antallImune)
            game.over(true)
        }
    }
    Bevegelse()
    Sykdom()
    Mutasjoner()
    Imunitet()
    Doktor()
    Rtall()
    pause(update)
    antallFriske = FriskLIST.length
    antallSyke = SykLIST.length
    antallImune = VaksineLIST.length
    antallLeger = LegeLIST.length
    antallDøde = DødLIST.length
    antallSprites = antallFriske + antallSyke + antallImune
    Flokkimunitet = antallImune / antallSprites
})
