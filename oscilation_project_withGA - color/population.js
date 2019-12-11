// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// A class to describe a population of faces
// this hasn't changed very much from example to example

// Create the population
class Population {
  constructor(m, num) {
    this.mutationRate = m; // Mutation rate
    this.population = []; // array to hold the current population
    this.matingPool = [];
    this.generations = 0; // Number of generations
    // for (let i = 0; i < num; i++) {
    //   this.population[i] = new Figure(new DNA(), 450 + i * 900, 400); //50 + i * 75, 60 |300 + i * 300, 300
    // }

    this.num = num;

    for (let i = 0; i < num; i++) {
      if (i < 5) {
        this.population[i] = new Figure(new DNA(), 450 + i * 900, 500);
    } else {
        this.population[i] = new Figure(new DNA(), 450 + (i-5) * 900, 1600);
    }
  }
  }

  //Map genes:
  mapGenes() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].mapGenes();
    }
  }

  //Calculate point values:
  calculatePointValues() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calculatePointValues();
    }
  }

  // Display all scaled faces
  displayScaled() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].displayScaled();
    }
  }

  // Display all regular faces
  displayRegular() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].displayRegular();
    }
  }

  // Are we rolling over any of the faces?
  rollover(mx, my) {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].rollover(mx, my);
    }
  }

  // Generate a mating pool
  selection() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    let maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      let fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      let n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let m = floor(random(this.matingPool.length));
      let d = floor(random(this.matingPool.length));
      // Pick two parents
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      // Get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
      // Mate their genes
      let child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      // this.population[i] = new Figure(child, 50 + i * 75, 60);


        if (i < 5) {
          this.population[i] = new Figure(child, 450 + i * 900, 500);
      } else {
          this.population[i] = new Figure(child, 450 + (i-5) * 900, 1600);
    }

    }
    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  // Find highest fitness for the population
  getMaxFitness() {
    let record = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record;
  }

  //Call shit from figure:
  displayFitness(){
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].displayFitness();
    }
  }

}
