class AddCalendarToImp < ActiveRecord::Migration
  def change
    add_column :imps, :calendar, :string
  end
end
