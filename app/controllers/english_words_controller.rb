class EnglishWordsController < ApplicationController
  def all
    render json: EnglishWord.all
  end

  def create
  end

  def update
  end

  def index; end
end
