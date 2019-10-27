class PokemonsController < ApplicationController
    def create
        # binding.pry
       pokemon = Pokemon.create(pokemon_params)
       pokemon.nickname = Faker::Name.first_name
       pokemon.species = Faker::Games::Pokemon.name
       pokemon.save
       render json: pokemon, only: [:nickname, :species, :trainer_id]
    #    binding.pry
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        # binding.pry
        pokemon.destroy
        # binding.pry
    end

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
