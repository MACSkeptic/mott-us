class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    render :text => "hai _o/"
  end
end
