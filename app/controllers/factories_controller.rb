class FactoriesController < ApplicationController
  before_action :set_factory, only: [:show, :edit, :update, :destroy]

  # GET /factories
  # GET /factories.json
  def index
    @factories = Factory.all
  end

  # GET /factories/1
  # GET /factories/1.json
  def show
  end

  # GET /factories/new
  def new
    @factory = Factory.new
  end

  # GET /factories/1/edit
  def edit
  end

  # POST /factories
  # POST /factories.json
  def create
    @factory = Factory.new(factory_create_params)

    respond_to do |format|
      if @factory.save
        format.html { redirect_to @factory, notice: 'Factory was successfully created.' }
        format.json { render :show, status: :created, location: @factory }
      else
        format.html { render :new }
        format.json { render json: @factory.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /factories/1
  # PATCH/PUT /factories/1.json
  def update
    respond_to do |format|
      if @factory.update(factory_params)
        format.html { redirect_to @factory, notice: 'Factory was successfully updated.' }
        format.json { render :show, status: :ok, location: @factory }
      else
        format.html { render :edit }
        format.json { render json: @factory.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /factories/1
  # DELETE /factories/1.json
  def destroy
    @factory.destroy
    respond_to do |format|
      format.html { redirect_to factories_url, notice: 'Factory was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def login
    @factory = Factory.where(["mobile = ? and encrypted_password = ?", params[:mobile], params[:encrypted_password]])

    respond_to do |format|
      if @factory.empty?
        format.json { render :json => {:data => "Login failed"}.to_json}
      else
        first = @factory[0]
        session['mobile'] = first.mobile
        format.json { render :json => {:data => "Login succ!"}.to_json}
      end
    end
  end

  def reset
    # 测试时直接加个的mobile,测完要注释掉,要取session的mobile
    mobile = 186
    #mobile = session['mobile']
    @factory = Factory.where(["mobile = ? and encrypted_password = ?",mobile, params[:old_encrypted_password]])
    respond_to do |format|
      if @factory.empty?
        format.json { render :json => {:data => "Reset failed"}.to_json }
      else
        first = @factory[0]
        first.update_attributes(:encrypted_password => params[:new_encrypted_password])
        format.json { render :json => {:data => "Retset succ"}.to_json }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_factory
      @factory = Factory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def factory_params
      params.fetch(:factory, {})
    end

    def factory_create_params
      params.require(:factory).permit(:mobile, :encrypted_password, :email, :name, :tel, :status)
    end
end
