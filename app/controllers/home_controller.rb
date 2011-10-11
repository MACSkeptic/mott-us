class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    render :text => current_user.name
  end
end
