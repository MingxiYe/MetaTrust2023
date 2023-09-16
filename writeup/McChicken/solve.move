module solution::mc_chicken_solution {

    // [*] Import dependencies
    use sui::tx_context::TxContext;
    use challenge::mc_chicken;
    use challenge::mc_chicken::{ChefCapability,Order};
    use std::bcs;
    use challenge::mc_chicken::{Mayo,Lettuce,ChickenSchnitzel,Cheese,Bun};

    struct Content1 has store, drop {
        b1:Bun,
        m1:Mayo,
        l1:Lettuce,
        c1:ChickenSchnitzel,
        cc1:Cheese,
        b2:Bun,
    }
    struct Content2 has store, drop {
        b1:Bun,
        c1:Cheese,
        c2:Cheese,
        cc1:ChickenSchnitzel,
        c3:Cheese,
        cc2:ChickenSchnitzel,
        c4:Cheese,
        cc3:ChickenSchnitzel,
        c5:Cheese,
        c6:Cheese,
        b2:Bun,
    }

    // [*] Public functions
    public fun solve(_chef: &mut ChefCapability, order1: &mut Order, order2: &mut Order, ctx: &mut TxContext) {

        /* add solution here */
        let content = Content1 {
            b1: mc_chicken::get_bun(_chef),
            m1: mc_chicken::get_mayo(_chef),
            l1: mc_chicken::get_lettuce(_chef),
            c1: mc_chicken::get_chicken_schnitzel(_chef),
            cc1: mc_chicken::get_cheese(_chef),
            b2: mc_chicken::get_bun(_chef)
        };
        mc_chicken::deliver_order(_chef, order1, content, ctx);
        let content = Content2{
            b1: mc_chicken::get_bun(_chef),
            c1: mc_chicken::get_cheese(_chef),
            c2: mc_chicken::get_cheese(_chef),
            cc1: mc_chicken::get_chicken_schnitzel(_chef),
            c3: mc_chicken::get_cheese(_chef),
            cc2: mc_chicken::get_chicken_schnitzel(_chef),
            c4: mc_chicken::get_cheese(_chef),
            cc3: mc_chicken::get_chicken_schnitzel(_chef),
            c5: mc_chicken::get_cheese(_chef),
            c6: mc_chicken::get_cheese(_chef),
            b2: mc_chicken::get_bun(_chef),
        };

        mc_chicken::deliver_order(_chef, order2, content, ctx);
    }

}
