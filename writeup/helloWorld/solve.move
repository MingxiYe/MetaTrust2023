module solution::hello_world_solution {
    use challenge::hello_world;
    public entry fun solve(status: &mut hello_world::Status) {
    
        /* Please add your solution here */
        hello_world::answer_to_life(status, b"42");

    }
}


